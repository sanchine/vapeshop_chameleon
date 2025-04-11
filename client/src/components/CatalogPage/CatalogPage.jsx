import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { BACKEND_IP } from '../../apiConfig';
import { CatalogItemPage } from './CatalogItemPage';


export const CatalogPage = () => {

    const [nameFilter, setNameFilter] = useState('')
    const [devicesData, setDevicesData] = useState([])
    const [devicesList, setDevicesList] = useState([])
    const [selectedDeviceType, setSelectedDeviceType] = useState('')
    const [sortingType, setSortingType] = useState('default') 
    const [selectedItem, setSelectedItem] = useState(null) 

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const res = await axios.get(`http://${BACKEND_IP}:3001/devices`)
                if (res) {
                    setDevicesData(res.data)
                    // setDevicesList(devicesData)
                }

            } catch (e) {
                console.log(e)
            }
        }
        fetchDevices()

    }, [])


    useEffect(() => {
        const sortDataByType = (type) => {
            console.log('sorting')
            switch (type) {
                case 'from-low': {
                    setDevicesList([...devicesData].sort((a, b) => a.price - b.price ));
                    return;
                }
                case 'from-high': {
                    setDevicesList([...devicesData].sort((a, b) => b.price - a.price));
                    return;
                }
                case 'default': {
                    setDevicesList([...devicesData]);
                    return;
                };
            }
        }

        sortDataByType(sortingType)
        console.log(devicesList[0])

    }, [devicesData, sortingType])

    
    const deleteOneFromDevicesData = (id) => {
        setDevicesData(prev => [...prev.filter(d => d.id !== id)])
    }

    const editOneFromDevicesData = (payload) => {
        setDevicesData(prev => [...prev.map(item => {
            if (item.id !== payload.id) return item

            return {...item, ...payload}
        })])
    }

    const handleDeleteItem = (id) => {
        const callToDelete = async (id) => {
            try {
                
                const res = await axios.delete(`http://localhost:3001/devices`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({id})
                })
                if (res) {
                    if (res.status == 200) {
                        deleteOneFromDevicesData(id)

                        if (selectedItem) onCleanUpSelectedItem()
                    }
                }

            } catch (e) {
                console.log(e)
            }
        }

        callToDelete(id)
    }

    const DeviceListItem = React.memo(({ info, onDelete }) => {

        const [isMouseOverItem, setIsMouseOverItem] = useState(false)

        const handleDelete = () => {
            onDelete(info.id)
        }

        
        return (
            <div onMouseEnter={() => setIsMouseOverItem(true)} onMouseLeave={() => setIsMouseOverItem(false)}  className="catalog-devices-list-item">
                    {isMouseOverItem ? <div>
                        <label onClick={handleDelete}>X</label><br></br>
                    </div> : <div><br></br></div>}

                <div onClick={() => setSelectedItem(info)} >
                    <img alt={info.model} src={info.image} width='230px' /> <br></br>
                    <b><label>{info.name}</label></b>
                    <p>{info.model}</p>
                    <p>{info.price + ' руб.'}</p>
                </div>
            </div>
        )
    }, [devicesList])
    
    const filterDevicesType = (src) => {
        const dest = []
        src.map(el => {
            if (dest.indexOf(el.type) !== -1) return
            dest.push(el.type)
        })
        return dest
    }

    const devices_types = filterDevicesType(devicesData)

    // const devices = devicesList.filter(d => d.type === selectedDeviceType || selectedDeviceType === '')

    const onSelectDeviceTypeHandler = (deviceType) => {
        setSelectedDeviceType(deviceType === selectedDeviceType ? '' : deviceType) 
    }

    const onCleanUpSelectedItem = () => {
        setSelectedItem(null)
    }

    if (selectedItem) {
        return <CatalogItemPage onExit={onCleanUpSelectedItem} info={selectedItem} onItemDataChanged={editOneFromDevicesData} onDeleteItem={handleDeleteItem} />
    }

    return (
        <div className="wrapper">

            <div className='catalog-device-type-bar'>

                {devices_types.map(d => {
                    if (d !== selectedDeviceType) return <label onClick={() => onSelectDeviceTypeHandler(d)}>{d}</label>
                    return <label onClick={() => onSelectDeviceTypeHandler(d)}><b>{d}</b></label>
                })}

            </div>
            
            <div className='catalog'>
                

                <div className='catalog-sidebar-filtering'>
                    <h3>Фильтр</h3>
                    <span>Название</span>
                    <input value={nameFilter} onChange={e => setNameFilter(e.target.value)} /> <br></br>
                    <span>Модель</span>
                    <input />
                </div>

                <div className="catalog-devices">
                    <div className="catalog-devices-sorting">
                        <span>Сортировка:</span>
                        <select onChange={(e) => setSortingType(e.target.value)}>
                            <option value="default">По умолчанию</option>
                            <option value="from-low">Сначала дешевле</option>
                            <option value="from-high">Сначала дороже</option>
                            
                        </select>
                    </div>

                    {devicesList.length !== 0 ? <div className='catalog-devices-list'>
                        {devicesList.filter(d => d.type === selectedDeviceType || selectedDeviceType === '').map(d => {
                            if (nameFilter !== '') {
                                return d.name.toLowerCase().includes(nameFilter.toLowerCase()) 
                                ? <DeviceListItem info={d} onDelete={handleDeleteItem} /> : null
                            }
                            return <DeviceListItem info={d} onDelete={handleDeleteItem} /> 
                        })}
                    </div> : null}

                </div>
            </div>

        </div>
    )

}
