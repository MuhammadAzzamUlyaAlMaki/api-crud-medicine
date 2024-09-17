import  Express  from "express";

import medicineRouter
    from "./router/medicineRouter"

const app = Express()
/**allow to read a body request with
 * JSON format
 */

app.use(Express.json())

/**prefix for medicine route */
app.use(`/medicine`, medicineRouter)

const PORT = 1992
app.listen(PORT, () => { 
    console.log(`Server drugstore run on port ${PORT}`)
})