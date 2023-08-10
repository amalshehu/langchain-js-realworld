import chalk from 'chalk'

export const logger = {
    info: (msg) => console.log(chalk.blue(msg)),
    success: (msg) => console.log(chalk.green(msg)),
    warning: (msg) => console.log(chalk.yellow(msg)),
    error: (msg) => console.log(chalk.red(msg))
}
