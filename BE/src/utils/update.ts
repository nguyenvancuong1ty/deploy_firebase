import { Timestamp, db } from '../db/firebase';
import ProductService from '../service/service.product';
const salePresent = [
    '8nX3CMnWoFe1kzFSwkLg',
    'BvNHmI0zRUlGaUo02kuI',
    'N16LYGaFv7kCAV4XluqX',
    'Nv0f5rFf4iwnJVxcqMZE',
    'VnoZZtB2FdAoaCxBpPBx',
    'dn61XaXrpZp24qrqMDZL',
    'fEKxiRF9MLVbyCRUAvq7',
    'hr4KJlhsk7VJzB1OtAd2',
    'paGmjNwKa6qAvZDoFH2x',
    '',
];
const update = async () => {
    const data: Array<object> = await ProductService.getAllProduct();
    const result = data.map(async (item: any) => {
        const random: number = Math.floor(Math.random() * 10);
        const productRef = db.collection('products').doc(item.Id);
        const res = await productRef.update({ sale: salePresent[random] });
        return res.id;
    });
    const a = await Promise.all(result);
};

const clothes = [
    {
        Id: '1Fe9yjIddxnYdXRuZqxP',
        sold: 55,
        images: 'https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,w_2000,h_1200,g_auto,fl_lossy,f_jpg/org/gti5ndttekv6zokuj.jpg',
        name: 'newProduct',
        weight: 3.1,
        detail: 'Bash moi banh moi day cac ban',

        type: 'clothes',
        deleted: false,
        price: 500000,
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fden.webp?alt=media&token=839f9360-4eae-4f94-86d6-cfeab8afc70e&_gl=1*10bkyp0*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fn%C3%A2u.jpg?alt=media&token=9773dc9d-9fbc-4152-9554-d979fabeba36&_gl=1*l81www*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Ftrang.webp?alt=media&token=983b7e47-98a2-4799-be31-0e5ea64505d5&_gl=1*1rx9z4n*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvang.jpg?alt=media&token=09993c3d-b02e-475c-b58c-3111fb4aee26&_gl=1*1e9asj8*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
        ],
        sale: 'dn61XaXrpZp24qrqMDZL',
        quantity: 433,
        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],
    },
    {
        Id: 'L1x6Mr9w9Ou67EgvKQma',
        sold: 45,
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fden.webp?alt=media&token=839f9360-4eae-4f94-86d6-cfeab8afc70e&_gl=1*10bkyp0*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fn%C3%A2u.jpg?alt=media&token=9773dc9d-9fbc-4152-9554-d979fabeba36&_gl=1*l81www*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Ftrang.webp?alt=media&token=983b7e47-98a2-4799-be31-0e5ea64505d5&_gl=1*1rx9z4n*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvang.jpg?alt=media&token=09993c3d-b02e-475c-b58c-3111fb4aee26&_gl=1*1e9asj8*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
        ],
        images: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fden.webp?alt=media&token=b103a2ab-123e-483d-b58a-1e69c60ba2f2&_gl=1*i58ti5*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5ODA4ODI4Ny4xMDMuMS4xNjk4MDg4OTMzLjYwLjAuMA..',
        quantity: 423,

        weight: 1.2,
        type: 'clothes',
        sale: {
            percent: 45,
            url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F45.webp?alt=media&token=21593ce6-9a8b-489c-b02a-85a6722278df&_gl=1*1e1qmra*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNDguMzUuMC4w',
        },
        deleted: false,
        price: 900000,
        name: 'Leather Jacket',
        detail: 'The Leather Jacket is a timeless and edgy outerwear option that adds a touch of attitude to any outfit. This jacket is made from high-quality leather, ensuring durability and style. It features a zip-up front, multiple pockets, and a sleek design. Pair it with jeans or a dress for a bold and fashionable look.',
        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],
    },
    {
        Id: 'PdKoowCMAbga5Drwk0qc',
        sold: 25,
        timeCreate: {
            _seconds: 1686714379,
            _nanoseconds: 136000000,
        },
        quantity: 403,
        deleted: false,
        price: 600000,
        name: 'Dress Shirt',
        weight: 0.4,
        detail: 'The Dress Shirt is a stylish and sophisticated option for formal or business attire. This shirt is made from high-quality fabric, ensuring a crisp and polished look. It features a button-up design with a classic collar and long sleeves. Pair it with dress pants or a skirt for a professional and elegant outfit.',

        type: 'clothes',
        sale: {
            percent: 25,
            url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F25.webp?alt=media&token=531fce30-edea-45ec-a502-7c65531b4fce&_gl=1*lt7xns*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyMzkuNDQuMC4w',
        },
        images: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fdemo.webp?alt=media&token=076228e8-409e-421b-842d-cedbd427fb68&_gl=1*kiblvj*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2MDA5NS44Ny4xLjE2OTc2NjAyODkuMzEuMC4w',
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fdemo.webp?alt=media&token=076228e8-409e-421b-842d-cedbd427fb68&_gl=1*kiblvj*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2MDA5NS44Ny4xLjE2OTc2NjAyODkuMzEuMC4w',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fsomiden.webp?alt=media&token=ca9b407b-da9d-4271-9586-15957d689525&_gl=1*13tn93p*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2MDA5NS44Ny4xLjE2OTc2NjAzMTguMi4wLjA.',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fsomi.webp?alt=media&token=d9d6c86a-038e-4582-8e31-abbf6894d102&_gl=1*1ji6q8f*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2MDA5NS44Ny4xLjE2OTc2NjAzMjUuNjAuMC4w',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fsomisoc.jpg?alt=media&token=eb9e48a3-012f-4b13-b40f-9bd4c5a28ecd&_gl=1*jkmu4a*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2MDA5NS44Ny4xLjE2OTc2NjAzMzMuNTIuMC4w',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fsomixanh.jpg?alt=media&token=94577dc1-0e9e-4d71-ad28-ddeb012acded&_gl=1*k8g2kk*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2MDA5NS44Ny4xLjE2OTc2NjAzNDMuNDIuMC4w',
        ],
        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],
    },
    {
        Id: 'TpYl044UK6Uw1fZTnOsR',
        sold: 35,
        timeCreate: {
            _seconds: 1686714379,
            _nanoseconds: 136000000,
        },
        images: 'https://tarmor.vn/wp-content/uploads/2020/07/skinny-jeans-light-blue.png',
        quantity: 413,
        deleted: false,
        price: 500000,
        name: 'Jeans',
        weight: 0.8,
        detail: 'Jeans are a timeless and versatile clothing item that can be dressed up or down for various occasions. These jeans are made from high-quality denim fabric, ensuring durability and a comfortable fit. They feature a classic straight leg design with a mid-rise waist. Pair them with a t-shirt for a casual look or dress them up with a blouse for a more polished ensemble.',

        type: 'clothes',
        sale: '',
        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fden.webp?alt=media&token=839f9360-4eae-4f94-86d6-cfeab8afc70e&_gl=1*10bkyp0*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fn%C3%A2u.jpg?alt=media&token=9773dc9d-9fbc-4152-9554-d979fabeba36&_gl=1*l81www*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Ftrang.webp?alt=media&token=983b7e47-98a2-4799-be31-0e5ea64505d5&_gl=1*1rx9z4n*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvang.jpg?alt=media&token=09993c3d-b02e-475c-b58c-3111fb4aee26&_gl=1*1e9asj8*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
        ],
    },
    {
        Id: 'Yk6WuDFosQIeF1QQviQP',
        sold: 35,
        timeCreate: {
            _seconds: 1686714379,
            _nanoseconds: 137000000,
        },
        images: 'https://assets.hermes.com/is/image/hermesproduct/quicker-sneaker--102190ZH09-worn-1-0-0-800-800_g.jpg',
        quantity: 413,
        deleted: false,
        price: 800000,
        name: 'Sneakers',
        weight: 0.9,
        detail: 'Sneakers are a practical and trendy footwear option for everyday wear. These sneakers are made from durable materials, ensuring longevity and comfort. They feature a lace-up design and a cushioned sole for support and impact absorption. Pair them with jeans, shorts, or dresses for a casual and sporty look.',

        type: 'clothes',
        sale: {
            percent: 50,
            url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F50.webp?alt=media&token=0d1b4ff9-b3c0-491c-9bb7-b1cd0d176cc9&_gl=1*1ev2zvg*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNTAuMzMuMC4w',
        },
        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fden.webp?alt=media&token=839f9360-4eae-4f94-86d6-cfeab8afc70e&_gl=1*10bkyp0*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fn%C3%A2u.jpg?alt=media&token=9773dc9d-9fbc-4152-9554-d979fabeba36&_gl=1*l81www*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Ftrang.webp?alt=media&token=983b7e47-98a2-4799-be31-0e5ea64505d5&_gl=1*1rx9z4n*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvang.jpg?alt=media&token=09993c3d-b02e-475c-b58c-3111fb4aee26&_gl=1*1e9asj8*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
        ],
    },
    {
        Id: 'caSW4W0D36ga43NJUKCO',
        sold: 30,
        timeCreate: {
            _seconds: 1686714379,
            _nanoseconds: 137000000,
        },
        images: 'https://bizweb.dktcdn.net/100/348/395/products/ao-sweater-ni-form-rong-nam-nu-local-brand-xanh-la-nhat.jpg?v=1639454096483',
        quantity: 418,
        deleted: false,
        price: 400000,
        name: 'Sweater',
        weight: 0.6,
        detail: 'The Sweater is a cozy and fashionable piece of clothing that is perfect for cooler weather. This sweater is made from soft and warm knit fabric, ensuring comfort and insulation. It features a crew neckline and long sleeves. Pair it with jeans or a skirt for a stylish and comfortable outfit during the colder months.',

        type: 'clothes',
        sale: {
            percent: 40,
            url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F40.webp?alt=media&token=ea29c6ff-0f07-4995-98f9-69ac62451ef9&_gl=1*4kkkgd*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNDYuMzcuMC4w',
        },
        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fden.webp?alt=media&token=839f9360-4eae-4f94-86d6-cfeab8afc70e&_gl=1*10bkyp0*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fn%C3%A2u.jpg?alt=media&token=9773dc9d-9fbc-4152-9554-d979fabeba36&_gl=1*l81www*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Ftrang.webp?alt=media&token=983b7e47-98a2-4799-be31-0e5ea64505d5&_gl=1*1rx9z4n*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvang.jpg?alt=media&token=09993c3d-b02e-475c-b58c-3111fb4aee26&_gl=1*1e9asj8*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
        ],
    },
    {
        Id: 'kDpb4Y331WXNAPclRlnD',
        sold: 45,
        timeCreate: {
            _seconds: 1686714379,
            _nanoseconds: 136000000,
        },
        deleted: false,
        price: 200000,
        detail: 'The T-Shirt is a versatile and comfortable piece of clothing that is perfect for casual wear. This t-shirt is made from soft and breathable fabric, ensuring comfort throughout the day. It features a classic design with a round neckline and short sleeves. Pair it with jeans or shorts for a relaxed and stylish look.',
        type: 'clothes',
        sale: {
            percent: 35,
            url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F35.webp?alt=media&token=98443b48-b49d-4b5f-9f25-cc6988a16fec&_gl=1*pf93i*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNDMuNDAuMC4w',
        },
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fphongnau.avif?alt=media&token=a193eec5-7fab-41f3-a469-3ccee39107f1&_gl=1*di93ig*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2NjIxMS44OC4xLjE2OTc2NjY0NDguMjQuMC4w',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fphongtrang.jpg?alt=media&token=9a137d32-2e06-424b-8cfb-3955877a56bc&_gl=1*ksvx52*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2NjIxMS44OC4xLjE2OTc2NjY0NjMuOS4wLjA.',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fphongghi.jpg?alt=media&token=ecb30d58-7359-42c1-b4d3-24ee4788cf0f&_gl=1*1xtzgrt*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2NjIxMS44OC4xLjE2OTc2NjY0NzMuNjAuMC4w',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fphongxanh.jpg?alt=media&token=7e518662-de91-412d-95fd-2dd7942fe17e&_gl=1*v4o8fz*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2NjIxMS44OC4xLjE2OTc2NjY0ODIuNTEuMC4w',
        ],
        images: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fphongnau.avif?alt=media&token=a193eec5-7fab-41f3-a469-3ccee39107f1&_gl=1*mqbri6*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzY2NjIxMS44OC4xLjE2OTc2NjYzMDQuMzYuMC4w',
        name: 'áo phông',
        weight: 0.5,
        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],

        quantity: 423,
    },
    {
        Id: 'ouehi2Yr7Ca8Ul4xkCgf',
        timeCreate: {
            _seconds: 1686714379,
            _nanoseconds: 137000000,
        },
        deleted: false,

        type: 'clothes',
        sale: {
            percent: 50,
            url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F50.webp?alt=media&token=0d1b4ff9-b3c0-491c-9bb7-b1cd0d176cc9&_gl=1*1ev2zvg*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNTAuMzMuMC4w',
        },
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvayden.jpg?alt=media&token=090a51bd-1f25-4413-9fe4-cb1e875949ba&_gl=1*14kqmh4*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzczMDYxNS45MS4xLjE2OTc3MzExMjguMzYuMC4w',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvaynau.jpg?alt=media&token=95521084-e4ca-493e-ae7a-180b7366184f&_gl=1*17onjnb*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzczMDYxNS45MS4xLjE2OTc3MzExNjkuNjAuMC4w',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvayden2.jpg?alt=media&token=01e3a76e-1502-4e99-8573-18a15050e66a&_gl=1*fmibmg*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzczMDYxNS45MS4xLjE2OTc3MzExODUuNDQuMC4w',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvaynau2.jpg?alt=media&token=635f235e-f04b-43c1-91b5-0b4176129c3c&_gl=1*vnbhub*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzczMDYxNS45MS4xLjE2OTc3MzExOTQuMzUuMC4w',
        ],
        sold: 45,
        images: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvayden.jpg?alt=media&token=090a51bd-1f25-4413-9fe4-cb1e875949ba&_gl=1*14kqmh4*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5NzczMDYxNS45MS4xLjE2OTc3MzExMjguMzYuMC4w',
        quantity: 423,
        price: 200000,
        name: 'váy dài',
        weight: 0.5,
        detail: 'The T-Shirt is a versatile and comfortable piece of clothing that is perfect for casual wear. This t-shirt is made from soft and breathable fabric, ensuring comfort throughout the day. It features a classic design with a round neckline and short sleeves. Pair it with jeans or shorts for a relaxed and stylish look.',

        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],
    },
    {
        Id: 'tgk5LysfXtoCEFigZyXF',
        sold: 35,
        timeCreate: {
            _seconds: 1686714379,
            _nanoseconds: 138000000,
        },
        images: 'https://mobile.yoox.com/images/items/12/12452962KC_14_f.jpg',
        quantity: 413,
        deleted: false,
        price: 300000,
        name: 'Polo Shirt',
        weight: 0.3,
        detail: 'The Polo Shirt is a classic and versatile piece of clothing that offers a combination of comfort and style. This shirt is made from breathable fabric, ensuring comfort during warmer days. It features a button-up collar and short sleeves. Pair it with shorts or chinos for a smart-casual look.',

        type: 'clothes',
        sale: {
            percent: 35,
            url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F35.webp?alt=media&token=98443b48-b49d-4b5f-9f25-cc6988a16fec&_gl=1*pf93i*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNDMuNDAuMC4w',
        },
        attribute: [
            {
                quantity: 25,
                size: 'S',
                color: 'vàng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'đen',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'trắng',
            },
            {
                quantity: 25,
                size: 'S',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'M',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'M',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'M',
                color: 'trắng',
            },
            {
                quantity: 44,
                size: 'M',
                color: 'nâu',
            },
            {
                quantity: 12,
                size: 'L',
                color: 'vàng',
            },
            {
                quantity: 88,
                size: 'L',
                color: 'đen',
            },
            {
                quantity: 17,
                size: 'L',
                color: 'trắng',
            },
        ],
        image: [
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fden.webp?alt=media&token=839f9360-4eae-4f94-86d6-cfeab8afc70e&_gl=1*10bkyp0*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fn%C3%A2u.jpg?alt=media&token=9773dc9d-9fbc-4152-9554-d979fabeba36&_gl=1*l81www*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Ftrang.webp?alt=media&token=983b7e47-98a2-4799-be31-0e5ea64505d5&_gl=1*1rx9z4n*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
            'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/clothes%2Fvang.jpg?alt=media&token=09993c3d-b02e-475c-b58c-3111fb4aee26&_gl=1*1e9asj8*_ga*MTgxNjM4NDgzOS4xNjg9MzA4Nj000000',
        ],
    },
];

const updateProduct = async () => {
    clothes.forEach(async (element) => {
        const productRef = db.collection('products').doc(element.Id);
        await productRef.set({ ...element, timeUpdate: Timestamp.fromDate(new Date()) });
    });
};

const addFieldProduct = async () => {
    const productRef = db.collection('products');
    const querySnapshot = await productRef.where('deleted', '==', false).where('type', '==', 'candy').get();

    const promises = querySnapshot.docs.map(async (doc: any) => {
        const data = doc.data();
        const tenDaysLater = new Date();
        tenDaysLater.setDate(new Date().getDate() + 100);
        data.expiryDate = tenDaysLater;
        productRef.doc(doc.id).update({ expiryDate: tenDaysLater });
    });

    await Promise.all(promises);
};

const addFieldAccount = async () => {
    const accountRef = db.collection('account');
    const querySnapshot = await accountRef.where('deleted', '==', false).get();
    const promises = querySnapshot.docs.map(async (doc: any) => {
        accountRef.doc(doc.id).update({ tokenNotify: '' });
    });

    await Promise.all(promises);
};
// update();

const getAllAccount = async () => {
    const accountRef = db.collection('products');
    const querySnapshot = await accountRef.get();
    const response = querySnapshot.docs.map(async (doc: any) => {
        const data = doc.data();
        // data.timeCreate = data.timeCreate._seconds * 1000;
        // data.expiryDate = data.expiryDate._seconds * 1000;
        return data;
    });

    const data = await Promise.all(response);

    console.log(data);
    return data;
};

getAllAccount();

const user = [
    {
        timeCreate: 1694148810000,
        password: '$2a$08$K5RrcWD0SStPe0GjGAYmLeERwlaqj0asVsgIpayk5yzpqDa0zMJAm',
        address: '',
        deleted: false,
        type_account: 'customer',
        active: false,
        fullName: 'Cường Nguyễn Văn',
        salary: 0,
        age: 18,
        username: 'nguyenvancuong19032002@gmail.com',
        tokenNotify: '',
    },
    {
        timeCreate: 1695976790000,
        password: '$2a$08$hUU/02ShXuh2SYbYaBVEmOF2oQJFdEI0E89mc9pBnABAj1SsX7Iw6',
        address: '',
        deleted: false,
        type_account: 'customer',
        active: false,
        fullName: 'hiepntph 2 7 9 4 2 fplhn',
        salary: 0,
        age: 18,
        username: 'hiepntph27942@fpt.edu.vn',
        tokenNotify: '',
    },
    {
        password: '$2a$08$OtFzUVm2P.jw/8X1KY4leetwgix1YuhZ9mokzolX56mPFYQDWnp4e',
        type_account: 'customer',
        deleted: false,
        active: true,
        fullName: 'Christopher Thompson',
        salary: 55000,
        age: 31,
        username: 'user7@gmail.com',
        timeCreate: 1685693705000,
        address: '19 duy tân, cầu giấy',
        tokenNotify: '',
    },
    {
        password: '$2a$08$lG1M14Wjy7rRIYu/P.CkgORIRYuahHwutx5hC4lHZVQ3TLyAGho6a',
        type_account: 'customer',
        deleted: false,
        active: true,
        fullName: 'Olivia Martinez',
        salary: 48000,
        age: 29,
        username: 'user8@gmail.com',
        timeCreate: 1685693705000,
        address: '36 hồ tùng mậu',
        tokenNotify: '',
    },
    {
        password: '$2a$08$VHBHfsDWucGn2muOYTTHyOD9H5HA/Prl51qZEbuk2yCfliqY86Rru',
        address: '123 Street, City',
        type_account: 'shipper',
        deleted: false,
        active: true,
        fullName: 'John Doe',
        salary: 50000,
        age: 30,
        username: 'user1@gmail.com',
        timeCreate: 1685693704000,
        tokenNotify:
            'cSFPjtQeyo8YB1Gv2VhUMf:APA91bFAg5siBquqwY9tzlIYx1aK1soKAMtnJp9yigTCkuc1Bs9V_f4-wn9GhLIDrjfot2btpgaVDoeAzxgOVj7pk9VXiMOkXAhapoaL4FPy9RNKwcvL2lqy_NSQVOA51WU3maVcDsEY',
    },
    {
        timeCreate: 1686631519000,
        address: '',
        deleted: false,
        active: true,
        fullName: 'Văn Cường Nguyễn',
        salary: 0,
        email: 'nguyenvancuong13102001t@gmail.com',
        age: 18,
        username: 'nguyenvancuong13102001t@gmail.com',
        password: '$2a$08$4oC4dP6TUgDXvjqMQkLuJejjN6nmAcSUwN8zlpBEyRIGoO1CN/cky',
        type_account: 'admin',
        tokenNotify:
            'dzs_-q9xvavV3ZvPwD6ZWe:APA91bELGR7DKUK-xUYK1fSF3Adzbpe5s4joDC9nI7GCIRljYqrSZPfqpj8cqrAYhmxk8g1Ckk8gltEcviSGjitIOrHFK-O1cg1UG7hiwEkqnSH2UFylRN_Hf32AXV-UeyHMCKA6KnNv',
    },
    {
        password: '$2a$08$94/qva0gHhEgoDubjXQpKuxJWcyCf.Ek4X1iVJuLXbUeQ8djsTx5W',
        type_account: 'customer',
        deleted: false,
        active: true,
        fullName: 'Daniel Johnson',
        salary: 60000,
        age: 33,
        username: 'user9@gmail.com',
        timeCreate: 1685693705000,
        address: '197 Tố Hữu',
        tokenNotify: '',
    },
    {
        password: '$2a$08$0mGhwZ7ZwTWJ9HGCa2oLlORnHzmkXVWO0n6iyFoqFD.UQZSkSeiCm',
        address: '654 Court, State',
        type_account: 'shipper',
        deleted: false,
        active: true,
        fullName: 'Michael Wilson',
        salary: 70000,
        age: 40,
        username: 'user5@gmail.com',
        timeCreate: 1685693704000,
        tokenNotify: '',
    },
    {
        password: '$2a$08$e/CxqdWLLseIzN7B0m27q.6QBDKp65WoYoDmWUB8YEpBjv6sYIi5i',
        address: '789 Road, Village',
        type_account: 'shipper',
        deleted: false,
        active: true,
        fullName: 'Robert Johnson',
        salary: 45000,
        age: 28,
        username: 'user3@gmail.com',
        timeCreate: 1685693704000,
        tokenNotify: '',
    },
    {
        password: '$2a$08$QxnujtTp3KJkr44PUskiNOsdRj1oWadkiI.wanTREHksj/F18k9/e',
        address: '321 Lane, County',
        type_account: 'shipper',
        deleted: false,
        active: true,
        fullName: 'Sarah Davis',
        salary: 55000,
        age: 32,
        username: 'user4@gmail.com',
        timeCreate: 1685693704000,
        tokenNotify: '',
    },
    {
        timeCreate: 1688636436000,
        password: '$2a$08$NH22K.MpGNdCTsCv7lhlLuMHN18.sUDZAc2dd60oxpKokH/yFA2vS',
        address: '',
        deleted: false,
        type_account: 'customer',
        active: false,
        fullName: '',
        salary: 0,
        age: 0,
        username: 'nguyenvancuong193121@gmail.com',
        tokenNotify:
            'dzs_-q9xvavV3ZvPwD6ZWe:APA91bELGR7DKUK-xUYK1fSF3Adzbpe5s4joDC9nI7GCIRljYqrSZPfqpj8cqrAYhmxk8g1Ckk8gltEcviSGjitIOrHFK-O1cg1UG7hiwEkqnSH2UFylRN_Hf32AXV-UeyHMCKA6KnNv',
    },
    {
        timeCreate: 1696860321000,
        password: '$2a$08$Yf7D.RtTHEjYSWO2PNSkReWXzK5uNFsdxCv7kwPf381KMauHd2WG.',
        address: '',
        deleted: false,
        type_account: 'customer',
        active: false,
        fullName: 'Lanh Nguyen',
        salary: 0,
        age: 18,
        username: 'nguyenlanhvfu94@gmail.com',
        tokenNotify: '',
    },
    {
        password: '$2a$08$XkbjWqtgoE2U23VmikHtK.xaOOy/MtJsRJyzPTa9BlUiehDT06d3C',
        type_account: 'customer',
        deleted: false,
        active: true,
        fullName: 'Sophia Brown',
        salary: 42000,
        age: 27,
        username: 'user20',
        timeCreate: 1685693705000,
        address: 'hoài đức, hà nội',
        tokenNotify: '',
    },
    {
        timeCreate: 1688370644000,
        address: '',
        deleted: false,
        type_account: 'customer',
        active: false,
        fullName: '',
        salary: 0,
        age: 0,
        username: 'user12@gmail.com',
        password: '$2a$08$oaKshIOZGcuxNo3etxrA5eObl4pX7eW.HnusIeR4kJqpZ1wOel8my',
        tokenNotify: '',
    },
    {
        email: 'admin',
        username: 'admin',
        password: '$2a$08$4oC4dP6TUgDXvjqMQkLuJejjN6nmAcSUwN8zlpBEyRIGoO1CN/cky',
        active: true,
        type_account: 'admin',
        age: 3,
        address: '388 mỹ đình 1',
        salary: 0,
        fullName: 'Admin ne',
        deleted: false,
        timeCreate: 1689134717000,
        tokenNotify:
            'dzs_-q9xvavV3ZvPwD6ZWe:APA91bELGR7DKUK-xUYK1fSF3Adzbpe5s4joDC9nI7GCIRljYqrSZPfqpj8cqrAYhmxk8g1Ckk8gltEcviSGjitIOrHFK-O1cg1UG7hiwEkqnSH2UFylRN_Hf32AXV-UeyHMCKA6KnNv',
    },
    {
        password: '$2a$08$jtl5bDusiPFenDIH44OvNOibqx4e1/udHiLtBSG2Qmse.pQyHV9tG',
        address: '456 Avenue, Town',
        type_account: 'shipper',
        deleted: false,
        active: true,
        fullName: 'Jane Smith',
        salary: 60000,
        age: 35,
        username: 'user2@gmail.com',
        timeCreate: 1685693704000,
        tokenNotify: '',
    },
];
const sale = [
    {
        percent: 35,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F35.webp?alt=media&token=98443b48-b49d-4b5f-9f25-cc6988a16fec&_gl=1*pf93i*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNDMuNDAuMC4w',
    },
    {
        percent: 45,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F45.webp?alt=media&token=21593ce6-9a8b-489c-b02a-85a6722278df&_gl=1*1e1qmra*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNDguMzUuMC4w',
    },
    {
        percent: 40,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F40.webp?alt=media&token=ea29c6ff-0f07-4995-98f9-69ac62451ef9&_gl=1*4kkkgd*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNDYuMzcuMC4w',
    },
    {
        percent: 30,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F30.webp?alt=media&token=33aa3ed3-6aa9-4b31-bbf2-4daf99b1a536&_gl=1*1y7qtef*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNDEuNDIuMC4w',
    },
    {
        percent: 15,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F15.webp?alt=media&token=c580bae2-3648-4c5e-b59f-e6c5d6678822&_gl=1*15921hu*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyMzQuNDkuMC4w',
    },
    {
        percent: 50,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F50.webp?alt=media&token=0d1b4ff9-b3c0-491c-9bb7-b1cd0d176cc9&_gl=1*1ev2zvg*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyNTAuMzMuMC4w',
    },
    {
        percent: 10,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F10.webp?alt=media&token=adbe898f-3886-4c93-9533-3c257dc5b0db&_gl=1*hc7acu*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyMjMuNjAuMC4w',
    },
    {
        percent: 25,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F25.webp?alt=media&token=531fce30-edea-45ec-a502-7c65531b4fce&_gl=1*lt7xns*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyMzkuNDQuMC4w',
    },
    {
        percent: 20,
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/Sale_percent%2F20.webp?alt=media&token=43efa9fa-f8d4-4d38-bbfe-429a4b024203&_gl=1*tqdmyz*_ga*MTgxNjM4NDgzOS4xNjg5MzA4Njcz*_ga_CW55HF8NVT*MTY5Njg0MzE1OS42NS4xLjE2OTY4NDMyMzYuNDcuMC4w',
    },
];
