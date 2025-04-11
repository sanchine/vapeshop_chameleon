import axios from "axios"
import { useState } from "react"

const CatalogItemPagePresentation = ({ itemDataForm, setItemDataForm, onSubmit, onExit, isEditMode, onEdit, onDelete }) => {
    
    return (
        <div>
            <button onClick={onExit}>Back</button>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>

            <div className="catalog-item">
                <img alt={itemDataForm.model} src={itemDataForm.image} width='230px' /> <br></br>

                {isEditMode ? (
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
                            <input value={itemDataForm.type} onChange={e => setItemDataForm(prev => {return {...prev, type: e.target.value}})} />
                            <input value={itemDataForm.name} onChange={e => setItemDataForm(prev => {return {...prev, name: e.target.value}})} />
                            <input value={itemDataForm.model} onChange={e => setItemDataForm(prev => {return {...prev, model: e.target.value}})} />
                            <input value={itemDataForm.price} onChange={e => setItemDataForm(prev => {return {...prev, price: e.target.value}})} />
                            <input multiple value={itemDataForm.description} onChange={e => setItemDataForm(prev => {return {...prev, description: e.target.value}})} />
                            <input value={itemDataForm.batteryCapacity} onChange={e => setItemDataForm(prev => {return {...prev, batteryCapacity: e.target.value}})} />
                            <input value={itemDataForm.image} onChange={e => setItemDataForm(prev => {return {...prev, image: e.target.value}})} />
                            
                        </div>

                        <input type="submit" value="Edit" onClick={onSubmit} />

                    </div>
                ) : (
                    <div>
                        <b><label>{itemDataForm.name} </label></b>
                        <label>{itemDataForm.model}</label>
                        <p>{itemDataForm.price + ' руб.'}</p>
                        <p>{itemDataForm.description}</p>
                    </div>
                )}
            </div>

        </div>
    )

}

export const CatalogItemPage = ({ onExit, info, onItemDataChanged, onDeleteItem }) => {

    const [isEditingModeEnabled, setIsEditingModeEnabled] = useState(false)
    const [itemDataForm, setItemDataForm] = useState({
        name: info.name,
        model: info.model,
        type: info.type,
        price: info.price,
        description: info.description,
        image: info.image,
        batteryCapacity: info.batteryCapacity
    })

    const handleEditSubmit = () => {
        const callToEdit = async (payload) => {
            try {
                const res = await axios.put(`http://localhost:3001/devices`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({...payload})
                })
                if (res) {
                    if (res.status === 200) {
                        onItemDataChanged({...payload})
                        setIsEditingModeEnabled(false)
                    } else {
                        new Error('Not Edit')
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }

        const editedDeviceFields = {}
        
        for (const prop in itemDataForm) {
            if (itemDataForm[prop] !== info[prop]) editedDeviceFields[prop] = itemDataForm[prop]
        }

        if (Object.keys(editedDeviceFields).length === 0) return

        callToEdit({id: info.id, ...editedDeviceFields})
        // console.log({id: info.id, ...editedDeviceFields})
    }    

    const handleDelete = () => {
        onDeleteItem(info.id)
        onExit()
    }

    return (
        <CatalogItemPagePresentation
         itemDataForm={itemDataForm} 
         setItemDataForm={setItemDataForm} 
         onSubmit={handleEditSubmit} 
         onExit={onExit} 
         isEditMode={isEditingModeEnabled} 
         onEdit={() => setIsEditingModeEnabled(prev => !prev)}
         onDelete={handleDelete} 
        />
    )
}