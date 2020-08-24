# BoilerBot
An open-source discord bot written in typescript, that will have a lot of basic functionality and can be used as boilerplate for your discord bot projects

## config.ts
```ts
export let token: string = "Your discord bot token";
export let mongourl: string = "Your mongodb url";
export let prefix: string = "!";

export let footer: string = "BoilerBot v1.0 by DeveloperDragon";
export let footerurl: string = "https://cdn.discordapp.com/avatars/297362162349768705/dedc6763b9418f0c6d6425cd2222bf09.png?size=256";
```

## Notes
Currently a couple things are unfinished.
The permission system has not been finished, when creating commands/using modules you should set the commands level to 0 so you can execute it.

The database system has not been finished, it might change drastically at any time, please account for this happening.