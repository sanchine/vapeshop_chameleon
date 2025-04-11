import { useState } from "react"
import axios from 'axios';

export const AdminPage = () => {

    const [deviceName, setDeviceName] = useState('')
    const [deviceType, setDeviceType] = useState('')
    const [deviceModel, setDeviceModel] = useState('')
    const [devicePrice, setDevicePrice] = useState('')
    const [deviceDescription, setDeviceDescription] = useState('')
    const [deviceBatteryCapacity, setDeviceBatteryCapacity] = useState('')
    const [deviceImage, setDeviceImage] = useState('')

    const onSubmitHandler = async () => {
        const device = {
            deviceType,
            deviceName,
            deviceModel,
            devicePrice,
            deviceDescription,
            deviceBatteryCapacity,
            deviceImage
        }
        
        try {
            
            const res = await axios.post('http://localhost:3001/devices/add', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({device})
            })

            if (res) console.log(res.statusText)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h2>Добавление товара</h2>

            <div className="admin-form-device-add">

                <div className="admin-form-device-add-props">
                    <label>Тип</label>
                    <label>Название</label>
                    <label>Модель</label>
                    <label>Цена</label>
                    <label>Описание</label>
                    <label>Ёмкость аккумулятора</label>
                    <label>Image URL</label>
                </div>

                <div>
                    <input value={deviceType} onChange={e => setDeviceType(e.target.value)} />
                    <input value={deviceName} onChange={e => setDeviceName(e.target.value)} />
                    <input value={deviceModel} onChange={e => setDeviceModel(e.target.value)} />
                    <input value={devicePrice} onChange={e => setDevicePrice(e.target.value)} />
                    <input multiple value={deviceDescription} onChange={e => setDeviceDescription(e.target.value)} />
                    <input value={deviceBatteryCapacity} onChange={e => setDeviceBatteryCapacity(e.target.value)} />
                    <input value={deviceImage} onChange={e => setDeviceImage(e.target.value)} />

                    
                </div>

                <input type="submit" value="Add" onClick={onSubmitHandler} />

            </div>

        </div>
    )

}