

export function CardTemp({ name, image}) {
    return (
        <div className="card" id={name}>
            <img src={image} alt={name} id={name+"-img"} />
        </div>
    )
}