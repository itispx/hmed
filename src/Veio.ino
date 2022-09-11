#include <SoftwareSerial.h>
#include <EEPROM.h>

#define rxPort 10
#define txPort 9
#define baudRate 9600 // bluetooth
#define delayTime 500 // ms
#define checkInterval 40000 // Milisegundos
#define perDayReg 4 // Registros/dia armazenáveis na memória.
#define debug

SoftwareSerial bluetooth(rxPort, txPort);
unsigned long lastMs = millis();
uint32_t currentTime = 0; // Segundos
uint16_t clockTime = 0; // Segundos

// Referências ao "dia" devem ser interpretados como referências aos dias da semana
// (domingo, segunda-feira, terça-feita, etc)

// O método atual pra verificar se deve disparar o "alarme" é olhando a cada {checkInterval} segundos se existe alguma
// regra no registro que coincida com uma regra criada a partir do horário atual.
// Uma melhor maneira de verificar se é o momento de disparar é armazenar qual é a próxima regra ao invés de procurar uma
// no registro. Isso evita uma busca na EEPROM toda vez que se passar os {checkInterval} segundos,
// procurando um novo "próxima regra" apenas quando a atual for validada, mas não estou familiarizado com a eficiência de cada método.

// Exemplo de um registro: {enumerador do dia da semana 0-6}{hora 0-23}{minutos 0-59}
// 11630. As 16:30, numa segunda-feira.

struct Rule{
    uint8_t weekday;
    uint8_t hour;
    uint8_t minute;
};
Rule* currentRule = new Rule;

#pragma region time
Rule* ruleFromCurrent(){
    #ifdef debug
    Serial.println("--ruleFromCurrent:start");
    #endif

    Rule* rule = new Rule;
    rule->weekday = ((get_current_time()/60/60/24) + 4) % 7; // 0 = domingo, 6 = sabado
    rule->hour = ((get_current_time()/60/60) % 24) - 3; // -3 = Horário de Brasília
    rule->minute = (get_current_time()/60) % 60;

    #ifdef debug
    Serial.println("--ruleFromCurrent:end");
    #endif

    return rule;
}
void ruleFromCurrent(Rule* rule){
    #ifdef debug
    Serial.println("--ruleFromCurrent:start");
    #endif

    rule->weekday = ((get_current_time()/60/60/24) + 4) % 7; // 0 = domingo, 6 = sabado
    rule->hour = ((get_current_time()/60/60) % 24) - 3; // -3 = Horário de Brasília
    rule->minute = (get_current_time()/60) % 60;
    
    #ifdef debug
    Serial.println("--ruleFromCurrent:end");
    #endif
}

Rule* ruleFromTimestamp(uint32_t timestamp){
    #ifdef debug
    Serial.println("--ruleFromTimestamp:start");
    #endif

    Rule* rule = new Rule;
    rule->weekday = ((timestamp/60/60/24) + 4) % 7; // 0 = domingo, 6 = sabado
    rule->hour = ((timestamp/60/60) % 24) - 3; // -3 = Horário de Brasília
    rule->minute = (timestamp/60) % 60;

    #ifdef debug
    Serial.println("--ruleFromTimestamp:end");
    #endif

    return rule;
}
void ruleFromTimestamp(Rule* rule, uint32_t timestamp){
    #ifdef debug
    Serial.println("--ruleFromTimestamp:start");
    #endif

    rule->weekday = ((timestamp/60/60/24) + 4) % 7; // 0 = domingo, 6 = sabado
    rule->hour = ((timestamp/60/60) % 24) - 3; // -3 = Horário de Brasília
    rule->minute = (timestamp/60) % 60;
    
    #ifdef debug
    Serial.println("--ruleFromTimestamp:end");
    #endif
}

void setCurrentTime(char* data){
    #ifdef debug
    Serial.println("--setCurrentTime:start");
    #endif

    currentTime = strtoul(data+2, NULL, 0);

    #ifdef debug
    Serial.print("Set time (seconds): ");
    Serial.println(get_current_time());
    Serial.println("--setCurrentTime:end");
    #endif
}
uint32_t get_current_time(){
    return currentTime + (millis() / 1000);
}
#pragma endregion

#pragma region eeprom
int8_t regExists(const Rule* rule){
    /*
        Return:
            -1: Register does not exist.
            n: Register position on the EEPROM.
    */
    #ifdef debug
    Serial.println("--regExists:start");
    #endif

    int8_t ret = -1;
    #define mult perDayReg*3 // 3=casas utilizadas pra armazenar uma regra.

    // Sim, boa parte da capacidade da EEPROM é inutilizada
    for(uint8_t i = rule->weekday*mult; i < (rule->weekday+1)*mult; i+=3){
        if (EEPROM.read(i) == rule->weekday &&
            EEPROM.read(i+1) == rule->hour &&
            EEPROM.read(i+2) == rule->minute){
            #ifdef debug
            ret = i;
            #else
            return i;
            #endif
        }
    }

    #ifdef debug
    Serial.print("--regExists:end ");
    Serial.println(ret);
    return ret;
    #endif
}

uint8_t createReg(const Rule* rule){
    /*
        Return:
            -1: Not enough space.
            0: Success.
            1: Register already exists.
    */
    #ifdef debug
    Serial.println("--createReg:start");
    #endif
    #define mult perDayReg*3 // 3=casas utilizadas pra armazenar uma regra.

    if (regExists(rule) == -1){
        const uint8_t p = rule->weekday*mult;
        int8_t pos = get_valid_position(rule);
        if (pos == -1){
          return -1;
        }
        EEPROM.write(p, rule->weekday);
        EEPROM.write(p+1, rule->hour);
        EEPROM.write(p+2, rule->minute);
        return 0;
    }

    #ifdef debug
    Serial.println("--createReg:end");
    #endif

    return 1;
}

int8_t delete_rule(const Rule* rule){
    /*
        Return:
            -1: Register does not exist.
            0: Success.
    */
    int8_t pos = regExists(rule);
    if (pos == -1) return -1;
    EEPROM.write(pos, 255);
    EEPROM.write(pos+1, 255);
    EEPROM.write(pos+2, 255);
    return 0;
}
#pragma endregion

#pragma region rule_manipulation
bool is_valid_rule(Rule* rule){
    if (rule->weekday < 0 || rule->weekday > 6) return false;
    if (rule->hour < 0 || rule->hour > 23) return false;
    if (rule->minute < 0 || rule->minute > 59) return false;
    return true;
}
uint8_t count_rules(){
    #define mult perDayReg * 3
    uint8_t count = 0;

    for(uint8_t i = 0; i < 7*mult; i+=3){
        uint8_t d = EEPROM.read(i);
        if (d >= 0 && d <= 6){
            count++;
        }
    }
    return count;
}
void list_rules(Rule* ruleArray){
    #define mult perDayReg * 3
    uint8_t count = 0;

    for(uint8_t i = 0; i < 7*mult; i+=3){
        uint8_t d = EEPROM.read(i);
        if (d >= 0 && d <= 6){
            Rule r;
            r.weekday = d;
            r.hour = EEPROM.read(i+1);
            r.minute = EEPROM.read(i+2);
            if (is_valid_rule(&r)){
                ruleArray[count] = r;
                count++;
            }
        }
    }
}
int8_t get_valid_position(const Rule* rule){
    /*
        Return:
            -1: Not enough space. All slots are filled.
            n: Position on EEPROM.
    */
    #define mult perDayReg*3 // 3=casas utilizadas pra armazenar uma regra.

    for(uint8_t i = rule->weekday*mult; i < (rule->weekday+1)*mult; i+=3){
        if (EEPROM.read(i) == 255 &&
            EEPROM.read(i+1) == 255 &&
            EEPROM.read(i+2) == 255){
            return i;
        }
    }
    return -1;
}
#pragma endregion

void getCommand(char* str, char* buffer){
    strncpy(buffer, str, 2);
    #ifdef debug
    Serial.println(buffer);
    #endif
}

void setup(){
    Serial.begin(9600);
    Serial.println("----BEGIN----");

    //pinMode(rxPort, INPUT);
    //pinMode(txPort, OUTPUT);
    //pinMode(8, OUTPUT); // Energia adicional pro modulo.
    //digitalWrite(8, HIGH); // Energia adicional pro modulo.
    //delay(1200);
    //bluetooth.begin(baudRate);

    // Para fim de testes. 1657311350 equivale a 20:15:50 no horário GMT. 17:15:50 no horário de Brasília.
    // Para o sistema, hoje é 08/07/2022, as 17:15:50, numa sexta-feira.
    // O número deve ser um timestamp UNIX.
    setCurrentTime("st1657311350");
    Rule rule1 = Rule{5, 17, 16}; // Sexta-feira, as 17:16 // Apenas esse deve disparar "hoje".
    Rule rule2 = Rule{2, 17, 16}; // Terça-feira, as 17:16
    Rule rule3 = Rule{6, 8, 21}; // Sábado, as 8:21
    Rule rule4 = Rule{0, 23, 59}; // Domingo, as 23:59
    createReg(&rule1);
    createReg(&rule2);
    createReg(&rule3);
    createReg(&rule4);
}

void loop(){
    delay(delayTime);
    unsigned long ms = millis();
    //currentTime += (ms - lastMs);
    clockTime += (ms - lastMs);

    #ifdef debug
    Serial.print("--Loop ");
    Serial.print(ms - lastMs);
    Serial.print(' ');
    Serial.println(get_current_time());
    #endif

    lastMs = ms;
    ruleFromCurrent(currentRule);

    if (Serial.available()){
        Serial.println("Serial!");
        on_serial();
    }

    if (bluetooth.available()){
        Serial.println("Bluetooth!");
        on_bluetooth();
    }

    /*
    if (clockTime >= checkInterval){
        clockTime = 0;
        #ifdef debug
        Serial.print("Check! Time (ms):");
        Serial.println(get_current_time());
        #endif

        int8_t exists = regExists(currentRule);
        if (exists != -1){
            #ifdef debug
            Serial.print("Rule! ");
            Serial.println(get_current_time());

            Rule rule = Rule();
            rule.weekday = EEPROM.read(exists);
            rule.hour = EEPROM.read(exists+1);
            rule.minute = EEPROM.read(exists+2);
            Serial.print(rule.weekday);
            Serial.print(", ");
            Serial.print(rule.hour);
            Serial.print(":");
            Serial.print(rule.minute);
            Serial.println();
            #endif

            // Aqui vai qualquer código que deva funcionar quando atinge o horário.

            delay(60000-(millis()-lastMs)); // Pra não repetir a mesma regra
        }
    }
    */
}


void on_bluetooth(){
    int available = bluetooth.available();

    char datachar[available];
    bluetooth.readBytes(datachar, available);

    #ifdef debug
    Serial.print("Received data: ");
    Serial.println(datachar);
    #endif

    char cmd[3] = {0};
    getCommand(datachar, cmd);

    if (strcmp(cmd, "st") == 0) { // st=setTime. Ex: st1657311350
        setCurrentTime(datachar);
    }
    else if (strcmp(cmd, "cr") == 0){ // cr=createReg. Ex: cr11630
        Rule rule;
        // cr02222
        char buff[3] = {0};
        strncpy(buff, datachar+2, 1);
        rule.weekday = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        strncpy(buff, datachar+3, 2);
        rule.hour = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        strncpy(buff, datachar+5, 2);
        rule.minute = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        if (!is_valid_rule(&rule)){
            Serial.println("Algo de errado aconteceu com a formatação.");
            bluetooth.print(-2);
        }
        else{
            #ifdef debug
            Serial.print("Create reg ");
            Serial.print(rule.weekday);
            Serial.print(' ');
            Serial.print(rule.hour);
            Serial.print(' ');
            Serial.print(rule.minute);
            Serial.println();
            #endif
            int8_t res = createReg(&rule);
            switch (res){
                case 1:
                    Serial.println("Registro ja existe.");
                    break;
                case 0:
                    Serial.println("Registro criado com sucesso");
                    break;
                case -1:
                    Serial.println("Espaco para registros desse dia da semana esta cheio.");
                    break;
            }
            bluetooth.print(res);
        }
    }
    else if (strcmp(cmd, "ls") == 0){
        Rule rules[count_rules()];
        list_rules(rules);
        for (Rule r : rules){
            bluetooth.print(r.weekday);
            bluetooth.print('-');
            bluetooth.print(r.hour);
            bluetooth.print('-');
            bluetooth.print(r.minute);
            bluetooth.println();
        }
        delay(150);
        delete[] rules;
    }
    else if (strcmp(cmd, "dr") == 0){
        Rule rule;
        // dr02222
        char buff[3] = {0};
        strncpy(buff, datachar+2, 1);
        rule.weekday = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        strncpy(buff, datachar+3, 2);
        rule.hour = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        strncpy(buff, datachar+5, 2);
        rule.minute = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        if (!is_valid_rule(&rule)){
            Serial.println("Algo de errado aconteceu com a formatação.");
            bluetooth.print(-2);
        }
        else{
            #ifdef debug
            Serial.print("Delete reg ");
            Serial.print(rule.weekday);
            Serial.print(' ');
            Serial.print(rule.hour);
            Serial.print(' ');
            Serial.print(rule.minute);
            Serial.println();
            #endif
            int8_t res = delete_rule(&rule);
            switch (res){
                case -1:
                    Serial.println("Registro nao existe.");
                    break;
                case 0:
                    Serial.println("Registro deletado com sucesso");
                    break;
            }
            bluetooth.print(res);
        }
    }
    else{
        bluetooth.print("error: unknown command");
    }

    delete[] datachar;
}

void on_serial(){
    int available = Serial.available();
    char datachar[available];
    Serial.readBytesUntil('\n', datachar, available);

    #ifdef debug
    Serial.print("Received data: ");
    Serial.println(datachar);
    #endif

    char cmd[3] = {0};
    getCommand(datachar, cmd);

    if (strcmp(cmd, "st") == 0) { // st=setTime. Ex: st1657311350
        setCurrentTime(datachar);
    }
    else if (strcmp(cmd, "cr") == 0){ // cr=createReg. Ex: cr 0 10:28
        Rule rule;
        //const uint8_t ind = datachar.indexOf(' ');
        //r.weekday = (uint8_t)datastr.substring(ind, datastr.indexOf(' ', ind+1)).toInt();
        //const String sub = datastr.substring(datastr.indexOf(' ', ind+1));
        //r.hour = (uint8_t)sub.substring(0, sub.indexOf(':')).toInt();
        //r.minute = (uint8_t)sub.substring(sub.indexOf(':')+1).toInt();
        char buff[3] = {0};
        strncpy(buff, datachar+3, 1);
        rule.weekday = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        strncpy(buff, datachar+5, 2);
        rule.hour = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        strncpy(buff, datachar+8, 2);
        rule.minute = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        if (!is_valid_rule(&rule)){
            Serial.println("Algo de errado aconteceu com a formatação.");
        }
        else{
            #ifdef debug
            Serial.print("Create reg ");
            Serial.print(rule.weekday);
            Serial.print(' ');
            Serial.print(rule.hour);
            Serial.print(' ');
            Serial.print(rule.minute);
            Serial.println();
            #endif
            int8_t res = createReg(&rule);
            switch (res){
                case 1:
                    Serial.println("Registro ja existe.");
                    break;
                case 0:
                    Serial.println("Registro criado com sucesso");
                    break;
                case -1:
                    Serial.println("Espaco para registros desse dia da semana esta cheio.");
                    break;
            }
        }
    }
    else if (strcmp(cmd, "ls") == 0){
        Rule rules[count_rules()];
        list_rules(rules);
        Serial.println("List reg");
        for (Rule r : rules){
            Serial.print(r.weekday);
            Serial.print(' ');
            Serial.print(r.hour);
            Serial.print(' ');
            Serial.print(r.minute);
            Serial.println();
        }
        delay(150);
        delete[] rules;
    }
    else if (strcmp(cmd, "dr") == 0){
        Rule rule;

        char buff[3] = {0};
        strncpy(buff, datachar+3, 1);
        rule.weekday = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        strncpy(buff, datachar+5, 2);
        rule.hour = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        strncpy(buff, datachar+8, 2);
        rule.minute = (uint8_t)atoi(buff);
        memset(buff, 0, 2);

        if (!is_valid_rule(&rule)){
            Serial.println("Algo de errado aconteceu com a formatação.");
        }
        else{
            #ifdef debug
            Serial.print("Delete reg ");
            Serial.print(rule.weekday);
            Serial.print(' ');
            Serial.print(rule.hour);
            Serial.print(' ');
            Serial.print(rule.minute);
            Serial.println();
            #endif
            int8_t res = delete_rule(&rule);
            switch (res){
                case -1:
                    Serial.println("Registro nao existe.");
                    break;
                case 0:
                    Serial.println("Registro deletado com sucesso");
                    break;
            }
        }
    }
}