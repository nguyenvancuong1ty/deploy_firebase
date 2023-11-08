import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ListImagesProduct({ images, productDetail, setProductDetail }) {
    const handleRemove = (image) => {
        console.log(image);
        const newListImage = images.filter((item) => {
            return item !== image;
        });
        setProductDetail((prev) => {
            const image = 'image';
            return {
                ...prev,
                [image]: newListImage,
            };
        });
    };
    return (
        <>
            {Array.isArray(images) && images.length ? (
                images.map((item) => {
                    return (
                        <div className="product__list--img" key={item}>
                            <img alt="" src={item} className="product__list--img--item" />
                            <FontAwesomeIcon
                                icon={faCircleMinus}
                                style={{ color: '#eb0000' }}
                                size="xl"
                                cursor={'pointer'}
                                onClick={() => handleRemove(item)}
                            />
                        </div>
                    );
                })
            ) : (
                <></>
            )}
        </>
    );
}

export default ListImagesProduct;
