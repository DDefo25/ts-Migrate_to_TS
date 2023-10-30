export const errorHandler: (error: Error) => void = (error) => {
    console.log("Ошибка в errorHandler")
    console.log(error)
}