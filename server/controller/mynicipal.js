const mysql = require("mysql2/promise")
const connection = require('../database/db')

class Mynicipal {
    async InfoMynicipal(req, res) {
        try {
            const { mynicipal, schools, year, item } = req.body
            const connect = await connection
            const [rows, fields] = await connect.execute("SELECT * FROM `infomynicipal` WHERE `mynicipal` = ?", [mynicipal])
            const expireMynicipal = rows[0]

            if(!expireMynicipal)
                return res.status(200).json({ error: "Муниципалитета нет!" })

            else if (expireMynicipal) {
                try {
                    const rowsMynicipal = await connect.execute("SELECT * FROM `infoyearschools` WHERE `year` = ? and `schools` = ? and `mynicipal` = ?", [year, schools, mynicipal])
                    const expireSchools = rowsMynicipal[0][0]['keyID']

                    if(String(expireSchools) == "") {
                        return res.status(200).json({ error: "Школа не выбрана и год!" })
                    } else {
                        const rowsItems = await connect.execute("SELECT `0`, `2`, `4`, `6`, `8`, `10`, `12`, `14`, `16`, `18`, `20`, `22`, `24`, `26`, `30`, `32`, `34`, `36`, `38`, `40`, `42`, `44`, `46`, `48`, `50`, `52`, `54`, `56`, `58`, `60`, `62`, `64`, `66`, `68`, `70`, `72`, `74`, `76`, `78`, `80`, `82`, `84`, `86`, `88`, `90`, `92`, `94`, `96`, `98`, `100` FROM `infoitems` WHERE `keyID` = ? and `items` = ?", [expireSchools, item])
                        const expireItems = rowsItems[0]

                        if(String(expireItems) == "")
                            return res.status(200).json({ error: "Предмет не найден" })
                        else {
                            return res.status(200).json({ message: expireItems })
                        }
                    }
                } catch (error) {
                    return res.status(200).json({ error: "Нету данных о `школе` и `годе`" })
                }

            } else {
                return res.status(200).json({ error: "Ошибка" })
            }
        } catch (error) {
            return res.status().json({message: error.message})
        }
    }

    async infoSchoolsFull(req, res) {
        try {
            const connect = await connection
            const [rowsFullSchools, fields] = await connect.execute("SELECT * FROM `infoselect` WHERE 1")
            return res.status(200).json({ message: rowsFullSchools })
        } catch (error) {
            return res.status(202).json({error: error.message})
        }
    }

    async infoFullItems(req, res) {
        try {
            const {mynicipal, schools, year} = req.body
            const connect = await connection

            const [rows, fields] = await connect.execute("SELECT * FROM `infomynicipal` WHERE `mynicipal` = ?", [mynicipal])
            const expireMynicipal = rows[0]

            if(!expireMynicipal)
                return res.status(404).json({ error: "Муниципалитета нет!" })

            else if (expireMynicipal) {
                try {
                    const rowsMynicipal = await connect.execute("SELECT * FROM `infoyearschools` WHERE `year` = ? and `schools` = ? and `mynicipal` = ?", [year, schools, mynicipal])
                    const expireSchools = rowsMynicipal[0][0]['keyID']

                    if(String(expireSchools) == "") {
                        return res.status(404).json({ error: "Школа не выбрана и год!" })
                    } else {
                        const rowsFullItems = await connect.execute("SELECT `0-9`, `10-19`, `20-29`, `30-39`, `40-49`, `50-59`, `60-69`, `70-79`, `80-89`, `90-99`, `-100` FROM `infofullitems` WHERE `keyID` = "+ expireSchools +"")
                        const rowsItemsName = await connect.execute("SELECT `item` FROM `infofullitems` WHERE `keyID` = "+ expireSchools +"")
                        const expireFullItems = rowsFullItems[0]
                        const expireItemsName = rowsItemsName[0]

                        if(String(expireFullItems) == "")
                            return res.status(404).json({ error: "Предметы не найдены" })
                        else {          
                            let itemsObject = []
                            for (let index = 0; index < expireItemsName.length; index++) {
                                let itemsFullObject = {}
                                itemsFullObject[expireItemsName[index]['item']] = expireFullItems[index]
                                itemsObject.push(itemsFullObject)
                            }
                            
                            return res.status(200).json({message: itemsObject})
                        }
                    }
                } catch (error) {
                    return res.status(404).json({ error: "Нету данных о `школе` и `годе`" })
                }

            } else {
                return res.status(404).json({ error: "Ошибка" })
            }
        } catch (error) {
            return res.status().json({error: error.message})
        }
    }
}

module.exports = new Mynicipal()