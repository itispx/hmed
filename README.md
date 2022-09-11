# Arduino Hmed

# Comandos

### Criar registro

Pelo monitor serial:
```vim
cr <x> <h> <m>

>>> cr 0 08 12
0
>>> cr 6 23 59
0
>>> cr 6 23 59
-1
>>> cr 4 02 05
0
```

Pelo bluetooth:
```vim
cr<x><h><m>

>>> cr00812
0
>>> cr62359
0
>>> cr62359
-1
>>> cr40205
0
```

- **x**: Dia da semana de 0-6. 0 corresponde à domingo, e 6 à sabado
- **h**: Hora de 0-23. Se for menor menor que *10*, deve conter um *0* no início.
- **m**: Minuto de 0-23. Se for menor menor que *10*, deve conter um *0* no início.

Retorna:

- **1** caso já exista um registro de mesmo horário.
- **0** caso sucesso.
- **-1** caso não tenha mais espaços disponíveis para armazenar novos registros nesse dia da semana.
- **-2** caso a formatação do comando esteja errado.

### Listar registros:
Retorna os horários registrados. O formato de saída depende da entrada (*bluetooth* ou *serial*).

Pelo monitor serial:
```vim
>>> ls
0 23 59
2 17 16
5 17 16
6 8 21
```

Pelo bluetooth (as caracteres *\n* são literais):
```vim
>>> ls
0-23-59\n2-17-16\n5-17-16\n6-8-21
```

### Deletar registro:

Pelo monitor serial:
```vim
dr <x> <h> <m>

>>> dr 0 08 12
0
>>> dr 6 23 59
0
>>> dr 6 23 59
-1
>>> dr 4 02 05
0
```

Pelo bluetooth:
```vim
cr<x><h><m>

>>> dr00812
0
>>> dr62359
0
>>> dr62359
-1
>>> dr40205
0
```

- **x**: Dia da semana de 0-6. 0 corresponde à domingo, e 6 à sabado
- **h**: Hora de 0-23. Se for menor menor que *10*, deve conter um *0* no início.
- **m**: Minuto de 0-23. Se for menor menor que *10*, deve conter um *0* no início.

Retorna:

- **0** caso sucesso.
- **-1** caso tal registro não exista.
- **-2** caso a formatação do comando esteja errado.

### Modificar relógio interno:

Pelo monitor serial:
```vim
st <x>

>>> st 1662920224
1662920224
```

Pelo bluetooth:
```vim
st<x>

>>> st1662920224
1662920224
```
- **x**: Um timestamp Unix. Você pode obter um online [aqui](https://www.unixtimestamp.com), ou a partir do sistema interno de um dispositivo mais capaz do que um Arduino.

Retorna o horário interno depois de modificado.