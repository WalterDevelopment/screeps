# Walter Development Screeps AI

## Introduction

Hey! This is a Screeps AI configurable using a single JavaScript containing a JSON array! [Config]

## How do I use it?

First, clone the repository using either:

- ***`git clone <WalterDevelopment/screeps' https link>`***

or

- ***`gh repo clone WalterDevelopment/screeps`***

Next, tweak the ***[Config]*** to your liking. (***[Docs](####config)***)

### Docs

#### Config

In the config file, there are *4* options:

- ***count***
- ***job***
- ***role***
- ***generations***

I will explain each of these:

- **count**: the amount of creeps you want this creep type to have
- **job**: the code for the creep. must contain the function ***(ex. 'roleHarvester.run')***
- **role**: the name of the role you are creating

##### generations

Each generation has multiple different properties, which is why I'm giving generations it's own section.

- ***generation***: the generation number, starts at 1.
- ***body***: the creep's body. ***(ex. [WORK, CARRY, MOVE])***

[Config]: src/config
