# Model

## Transaction

### Atributos

ownerEmail: String

hostEmail: String

pet: Pet

home: Home

value: Int

### Métodos

#### Transaction.constructor

O método constructor apenas cria uma transação, associando seus atributos aos seus devidos valores.

## Pet

### Atributos

name: String

species: String

size: String

nature: String

state: String

state: Int

birthDate: Date

photo: Photo

userId: Int

### Métodos

#### Pet.constructor

O método é similiar ao constructor de Transaction, associa os atributos aos seus valores respectivos.

#### Pet.setAttributesFromJson

O método coloca atributos responsáveis para o funcionamento do Json, necessário para o parser e troca de dados.

 
