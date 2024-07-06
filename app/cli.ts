import "reflect-metadata";
import { cac } from "cac";
import registerCommands from "./src/clis";

const cli = cac("my-cli");

registerCommands(cli);

cli.help();
cli.version("1.0.0");
cli.parse();
