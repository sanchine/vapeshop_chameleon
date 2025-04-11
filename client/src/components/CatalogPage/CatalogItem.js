export const CatalogItem = ({ onExit, info }) => {

    return (
        <div>
            <button onClick={onExit}>Back</button>

            <div className="catalog-devices-list-item">
                <div>
                    <img alt={info.model} src={info.image} width='230px' /> <br></br>
                    <b><label>{info.name}</label></b>
                    <p>{info.model}</p>
                    <p>{info.price + ' руб.'}</p>
                </div>
            </div>

        </div>
    )
}