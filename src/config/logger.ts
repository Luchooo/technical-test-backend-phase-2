import { createLogger, format, transports } from 'winston'

export const print = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.printf(({ level, message }) => {
      let emoji = '🍰'
      if (level.includes('error')) emoji = '🚨'
      if (level.includes('info')) emoji = '🔊'
      if (level.includes('warn')) emoji = '⚠️ '
      return `${emoji} ${level}: ${message}`
    })
  )
})
