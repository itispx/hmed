#include <SoftwareSerial.h>
#include <EEPROM.h>

#define rxPort 10
#define txPort 9
#define btnPort 11
#define baudRate 9600 // bluetooth
#define delayTime 500 // ms
#define checkInterval 10000 // Milisegundos
#define blinkingInterval 500 // Milisegundos
#define perDayReg 4 // Registros/dia armazenáveis na memória.
#define debug

SoftwareSerial bluetooth(rxPort, txPort);
unsigned long lastMs = millis(); // Milisegundos
unsigned long timeOffset = 0; // Milisegundos
uint32_t currentTime = 0; // Segundos
uint16_t clockTime = 0; // Segundos

bool ruleChanged = true;

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
void updateCurrentRule() {
    #ifdef debug
    Serial.println("--updateCurrentRule:start");
    #endif

    currentRule->weekday = ((getCurrentTime()/60/60/24) + 4) % 7; // 0 = domingo, 6 = sabado
    currentRule->hour = ((getCurrentTime()/60/60) % 24) - 3; // -3 = Horário de Brasília
    uint8_t m = (getCurrentTime()/60) % 60;
    if (m != currentRule->minute) ruleChanged = true;
    currentRule->minute = m;
    
    #ifdef debug
    Serial.println("--updateCurrentRule:end");
    #endif
}

Rule* ruleFromTimestamp(uint32_t timestamp) {
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
void ruleFromTimestamp(Rule* rule, uint32_t timestamp) {
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

void setCurrentTime(char* data) {
    #ifdef debug
    Serial.println("--setCurrentTime:start");
    #endif

    timeOffset = millis();
    currentTime = strtoul(data+2, NULL, 0);

    updateCurrentRule();

    #ifdef debug
    Serial.print("Set time (seconds): ");
    Serial.println(getCurrentTime());
    Serial.println("--setCurrentTime:end");
    #endif
}
uint32_t getCurrentTime() {
    return currentTime + ((millis() - timeOffset) / 1000);
}
#pragma endregion

#pragma region eeprom
int8_t regExists(const Rule* rule) {
    /*
        Return:
            -1: Register does not exist.
            n: Register position on the EEPROM.
    */
    #ifdef debug
    int8_t ret = -1;
    Serial.println("--regExists:start");
    #endif

    #define mult perDayReg*3 // 3=casas utilizadas pra armazenar uma regra.

    // Sim, boa parte da capacidade da EEPROM é inutilizada
    for(uint8_t i = rule->weekday*mult; i < (rule->weekday+1)*mult; i+=3) {
        if (EEPROM.read(i) == rule->weekday &&
            EEPROM.read(i+1) == rule->hour &&
            EEPROM.read(i+2) == rule->minute) {
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

uint8_t createReg(const Rule* rule) {
    /*
        Return:
            -1: Not enough space.
            0: Success.
            1: Register already exists.
    */
    #ifdef debug
    int8_t ret = -1;
    Serial.println("--createReg:start");
    #endif
    #define mult perDayReg*3 // 3=casas utilizadas pra armazenar uma regra.

    if (regExists(rule) == -1) {
        const uint8_t p = rule->weekday*mult;
        int8_t pos = getValidPosition(rule);
        if (pos == -1) {
            #ifdef debug
            ret = -1;
            #else
            return -1;
            #endif
        }
        EEPROM.write(p, rule->weekday);
        EEPROM.write(p+1, rule->hour);
        EEPROM.write(p+2, rule->minute);
        #ifdef debug
        ret = 0;
        #else
        return 0;
        #endif
    }

    #ifdef debug
    Serial.print("--createReg:end ");
    Serial.println(ret);
    return ret;
    #else
    return 1;
    #endif

}

int8_t deleteRule(const Rule* rule) {
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
bool isValidRule(Rule* rule) {
    if (rule->weekday < 0 || rule->weekday > 6) return false;
    if (rule->hour < 0 || rule->hour > 23) return false;
    if (rule->minute < 0 || rule->minute > 59) return false;
    return true;
}
uint8_t countRules() {
    #define mult perDayReg * 3
    uint8_t count = 0;

    for(uint8_t i = 0; i < 7*mult; i+=3) {
        uint8_t d = EEPROM.read(i);
        if (d >= 0 && d <= 6) {
            count++;
        }
    }
    return count;
}
void listRules(Rule* ruleArray) {
    #define mult perDayReg * 3
    uint8_t count = 0;

    for(uint8_t i = 0; i < 7*mult; i+=3) {
        uint8_t d = EEPROM.read(i);
        if (d >= 0 && d <= 6) {
            Rule r;
            r.weekday = d;
            r.hour = EEPROM.read(i+1);
            r.minute = EEPROM.read(i+2);
            if (isValidRule(&r)) {
                ruleArray[count] = r;
                count++;
            }
        }
    }
}
int8_t getValidPosition(const Rule* rule) {
    /*
        Return:
            -1: Not enough space. All slots are filled.
            n: Position on EEPROM.
    */
    #define mult perDayReg*3 // 3=casas utilizadas pra armazenar uma regra.

    for(uint8_t i = rule->weekday*mult; i < (rule->weekday+1)*mult; i+=3) {
        if (EEPROM.read(i) == 255 &&
            EEPROM.read(i+1) == 255 &&
            EEPROM.read(i+2) == 255) {
            return i;
        }
    }
    return -1;
}
uint8_t pin_for_weekday(uint8_t weekday) {
    switch (weekday) {
        default:
            return weekday + 2;
    }
}
void print_rule(Rule* rule){
    Serial.print(rule->weekday);
    Serial.print(' ');
    Serial.print(rule->hour);
    Serial.print(' ');
    Serial.println(rule->minute);
}
void clear_rules(){
    for (int i = 0 ; i < EEPROM.length() ; i++) {
        EEPROM.write(i, 255);
        if (i % 10 == 0) Serial.println("Cleared 10...");
    }
}
#pragma endregion

void getCommand(char* str, char* buffer) {
    strncpy(buffer, str, 2);
    #ifdef debug
    Serial.println(buffer);
    #endif
}

void setup() {
    Serial.begin(9600);
    Serial.println("----BEGIN----");

    pinMode(rxPort, INPUT);
    pinMode(txPort, OUTPUT);

    pinMode(btnPort, INPUT);
    delay(1200);
    bluetooth.begin(baudRate);

    // Para fim de testes. 1657311350 equivale a 20:15:50 no horário GMT. 17:15:50 no horário de Brasília.
    // Para o sistema, hoje é 08/07/2022, as 17:15:50, numa sexta-feira.
    // O número deve ser um timestamp UNIX.
    setCurrentTime("st1657311300");
    Rule rule1 = Rule{5, 17, 16}; // Sexta-feira, as 17:16
    Rule rule2 = Rule{2, 17, 16}; // Terça-feira, as 17:16
    Rule rule3 = Rule{6, 8, 21}; // Sábado, as 8:21
    Rule rule4 = Rule{0, 23, 59}; // Domingo, as 23:59
    Rule rule5 = Rule{5, 17, 19}; // Sexta-feira, as 17:19
    createReg(&rule1);
    createReg(&rule2);
    createReg(&rule3);
    createReg(&rule4);
    createReg(&rule5);
}

void loop() {
    delay(delayTime);
    unsigned long ms = millis();

    #ifdef debug
    Serial.print("--Loop ");
    Serial.print(ms - lastMs);
    Serial.print(' ');
    Serial.println(getCurrentTime());
    
    Rule* rule = ruleFromTimestamp(getCurrentTime());
    print_rule(rule);
    delete rule;
    #endif

    clockTime += (ms - lastMs);
    lastMs = ms;

    if (digitalRead(btnPort) == HIGH) {
        on_button();
    }

    if (Serial.available()) {
        Serial.println("Serial!");
        on_serial();
    }

    if (bluetooth.available()) {
        Serial.println("Bluetooth!");
        on_bluetooth();
    }

    if (clockTime >= checkInterval) {
        updateCurrentRule();
        if (!ruleChanged) return;

        clockTime = 0;
        ruleChanged = false;
        #ifdef debug
        Serial.print("=====================================================Check! Time (ms):");
        Serial.println(getCurrentTime());
        Serial.print("Current rule: ");
        print_rule(currentRule);
        #endif

        int8_t exists = regExists(currentRule);
        if (exists != -1) {
            #ifdef debug
            Serial.print("Rule! ");
            Serial.println(getCurrentTime());

            Rule rule = Rule();
            rule.weekday = EEPROM.read(exists);
            rule.hour = EEPROM.read(exists+1);
            rule.minute = EEPROM.read(exists+2);
            print_rule(&rule);
            #endif

            on_clock(&rule);
        }
    }
}

void on_clock(Rule* rule) {
    uint8_t pin = pin_for_weekday(rule->weekday);
    pinMode(pin, OUTPUT);
    for (uint8_t iter = 0; digitalRead(btnPort) != HIGH; iter++)
    {
        digitalWrite(pin, iter & 1);
        delay(blinkingInterval);
    }
}

void on_button() {
    for (uint8_t i = 0; i < 7; i++) {
        digitalWrite(i + 2, LOW);
    }
}

void on_bluetooth() {
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
        bluetooth.print(currentTime);
    }
    else if (strcmp(cmd, "cr") == 0) { // cr=createReg. Ex: cr11630
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

        if (!isValidRule(&rule)) {
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
            switch (res) {
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
    else if (strcmp(cmd, "ls") == 0) {
        Rule rules[countRules()];
        listRules(rules);
        for (Rule r : rules) {
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
    else if (strcmp(cmd, "dr") == 0) {
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

        if (!isValidRule(&rule)) {
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
            int8_t res = deleteRule(&rule);
            switch (res) {
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
    else if (strcmp(cmd, "cl") == 0) { // cl=clear.
        #ifdef debug
        Serial.println("Clear");
        #endif
        clear_rules();
    }
    else{
        bluetooth.print("error: unknown command");
    }

    delete[] datachar;
}

void on_serial() {
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
    else if (strcmp(cmd, "cr") == 0) { // cr=createReg. Ex: cr 0 10:28
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

        if (!isValidRule(&rule)) {
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
            switch (res) {
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
    else if (strcmp(cmd, "ls") == 0) {
        Rule rules[countRules()];
        listRules(rules);
        Serial.println("List reg");
        for (Rule r : rules) {
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
    else if (strcmp(cmd, "dr") == 0) {
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

        if (!isValidRule(&rule)) {
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
            int8_t res = deleteRule(&rule);
            switch (res) {
                case -1:
                    Serial.println("Registro nao existe.");
                    break;
                case 0:
                    Serial.println("Registro deletado com sucesso");
                    break;
            }
        }
    }
    else if (strcmp(cmd, "cl") == 0) { // cl=clear.
        #ifdef debug
        Serial.println("Clear");
        #endif
        clear_rules();
    }
    delete[] datachar;
}