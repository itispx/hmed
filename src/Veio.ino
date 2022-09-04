#include <SoftwareSerial.h>
#include <EEPROM.h>

#define rxPort 10
#define txPort 9
#define baudRate 9600 // bluetooth
#define delayTime 500 // ms
#define checkInterval 40 // segundos
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
// 11635. As 16:30, numa segunda-feira

// Teoricamente, é necessário o transporte de somente 3 bytes de informações,
// sendo que cada byte pode armazenar um número no alcance 0-255.
// Uma compactação pode ser feita para armazenar em 14 bits. 3 (0-7) para armazenar o dia,
// 5 (0-31) para armazenar a hora e 6 (0-63) para armazenar os minutos.
struct Rule{
    uint8_t weekday;
    uint8_t hour;
    uint8_t minute;
};
Rule* currentRule = new Rule;

Rule* ruleFromCurrent(){
    #ifdef debug
    Serial.println("--ruleFromCurrent:start");
    #endif

    Rule* rule = new Rule;
    rule->weekday = ((currentTime/60/60/24) + 4) % 7; // 0 = domingo, 6 = sabado
    rule->hour = ((currentTime/60/60) % 24) - 3; // -3 = Horário de Brasília
    rule->minute = (currentTime/60) % 60;

    #ifdef debug
    Serial.println("--ruleFromCurrent:end");
    #endif

    return rule;
}
void ruleFromCurrent(Rule* rule){
    #ifdef debug
    Serial.println("--ruleFromCurrent:start");
    #endif

    rule->weekday = ((currentTime/60/60/24) + 4) % 7; // 0 = domingo, 6 = sabado
    rule->hour = ((currentTime/60/60) % 24) - 3; // -3 = Horário de Brasília
    rule->minute = (currentTime/60) % 60;
    
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

void setCurrentTime(const String* bluetoothData){ // Deve receber um texto tipo "t1657055229", sendo os números os segundos.
    #ifdef debug
    Serial.println("--setCurrentTime:start");
    #endif

    char datachar[bluetoothData->length()];
    currentTime = strtoul(datachar+2, NULL, 0); // +2 pra pular a caractere inicial "st"

    #ifdef debug
    Serial.print("Set time (seconds): ");
    Serial.println(currentTime);
    Serial.println("--setCurrentTime:end");
    #endif

    delete[] datachar;
}
void setCurrentTime(char* bluetoothData){
    #ifdef debug
    Serial.println("--setCurrentTime:start");
    #endif

    currentTime = strtoul(bluetoothData+2, NULL, 0);

    #ifdef debug
    Serial.print("Set time (seconds): ");
    Serial.println(currentTime);
    Serial.println("--setCurrentTime:end");
    #endif
}

int8_t regExists(const Rule* rule){
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

void createReg(const Rule* rule){
    #ifdef debug
    Serial.println("--createReg:start");
    #endif
    #define mult perDayReg*3 // 3=casas utilizadas pra armazenar uma regra.

    if (regExists(rule) == -1){
        const uint8_t p = rule->weekday*mult;
        EEPROM.write(p, rule->weekday);
        EEPROM.write(p+1, rule->hour);
        EEPROM.write(p+2, rule->minute);
    }

    #ifdef debug
    Serial.println("--createReg:end");
    #endif
}

String getCommand(const String* str){
    #ifdef debug
    char buff[2];
    str->substring(0, 2).toCharArray(buff, 2);
    Serial.println(buff);
    #endif
    return str->substring(0, 2);
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

void on_bluetooth(){
    Serial.print("Bluetooth! ");
    Serial.println(bluetooth.available());

    char datachar[bluetooth.available()];
    String datastr = bluetooth.readString();
    datastr.toCharArray(datachar, datastr.length());

    #ifdef debug
    Serial.print("Received data: ");
    Serial.println(datastr);
    #endif

    String cmd = getCommand(&datastr);

    if (cmd.equals("st")) { // st=setTime. Ex: st1657311350
        setCurrentTime(&datastr);
    }
    else if (cmd.equals("cr")){ // cr=createReg. Ex: cr11635
        Rule rule;
        rule.weekday = (uint8_t)datachar[2];
        rule.hour = (uint8_t)datachar[3];
        rule.minute = (uint8_t)datachar[4];

        #ifdef debug
        Serial.println("Rule:");
        Serial.println(rule.hour);
        Serial.println(rule.minute);
        Serial.println(rule.weekday);
        #endif

        createReg(&rule);
    }
    else{
        bluetooth.write("error: unknown command");
    }

    delete[] datachar;
}

void on_serial(){
    String datastr = Serial.readString();

    #ifdef debug
    Serial.print("Received data: ");
    Serial.println(datastr);
    #endif

    if (datastr.startsWith("st")) { // st=setTime. Ex: st1657311350
        setCurrentTime(&datastr);
    }
    else if (datastr.startsWith("cr")){ // cr=createReg. Ex: cr 0 10:28
        Rule r;
        const uint8_t ind = datastr.indexOf(' ');
        r.weekday = (uint8_t)datastr.substring(ind, datastr.indexOf(' ', ind+1)).toInt();
        const String sub = datastr.substring(datastr.indexOf(' ', ind+1));
        r.hour = (uint8_t)sub.substring(0, sub.indexOf(':')).toInt();
        r.minute = (uint8_t)sub.substring(sub.indexOf(':')+1).toInt();

        if (r.weekday<0 || r.weekday>6 || r.hour<0 || r.hour>23 || r.minute<0 || r.minute>59){
            Serial.println("Algo de errado aconteceu com a formatação.");
        }
        else{
            #ifdef debug
            Serial.println("Create reg");
            #endif
            createReg(&r);
        }
    }
}

void loop(){
    delay(delayTime);
    unsigned long ms = millis();
    currentTime += (ms - lastMs) / 1000;
    clockTime += (ms - lastMs) / 1000;

    #ifdef debug
    Serial.print("--Loop ");
    Serial.print(millis() - lastMs);
    Serial.print(' ');
    Serial.println(currentTime);
    #endif

    lastMs = ms;
    ruleFromCurrent(currentRule);

    if (Serial.available()){
        on_serial();
    }

    if (bluetooth.available()){
        on_bluetooth();
    }

    //if (currentTime % checkInterval >= checkInterval-(delayTime/1000)-1){
    if (clockTime >= checkInterval){
        clockTime = 0;
        #ifdef debug
        Serial.print("Check! Time (ms):");
        Serial.println(currentTime);
        #endif

        int8_t exists = regExists(currentRule);
        if (exists != -1){
            #ifdef debug
            Serial.print("Rule! ");
            Serial.println(currentTime);

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

            /*

            Aqui vai qualquer código que deva funcionar quando atinge o horário.

            */

            delay(60000-(millis()-lastMs)); // Pra não repetir a mesma regra
        }
    }
}
