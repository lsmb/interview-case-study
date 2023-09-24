import { ErrorRequestHandler, RequestHandler } from "express"
import { BackendError } from "./error"

export const errorHandler: ErrorRequestHandler = (err: BackendError | Error, _req, res, _next) => {
  console.error("Error ocurred:", err)

  if (err instanceof BackendError) {
    return res.status(err.status || 500).send(err.message)
  }

  return res.status(500).send("Something definitely very unexpected happened.")
}

export const customLogger: RequestHandler = (req, _res, next) => {
  const date = new Date()

  console.info(`${date.toISOString()} | ${req.url}`)
  next()
}
