"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../db/firebase");
const service_product_1 = __importDefault(require("../service/service.product"));
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
const update = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_product_1.default.getAllProduct();
    const result = data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const random = Math.floor(Math.random() * 10);
        const productRef = firebase_1.db.collection('products').doc(item.Id);
        const res = yield productRef.update({ sale: salePresent[random] });
        return res.id;
    }));
    const a = yield Promise.all(result);
});
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
const updateProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    clothes.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
        const productRef = firebase_1.db.collection('products').doc(element.Id);
        yield productRef.set(Object.assign(Object.assign({}, element), { timeUpdate: firebase_1.Timestamp.fromDate(new Date()) }));
    }));
});
const addFieldProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const productRef = firebase_1.db.collection('products');
    const querySnapshot = yield productRef.where('deleted', '==', false).where('type', '==', 'candy').get();
    const promises = querySnapshot.docs.map((doc) => __awaiter(void 0, void 0, void 0, function* () {
        const data = doc.data();
        const tenDaysLater = new Date();
        tenDaysLater.setDate(new Date().getDate() + 100);
        data.expiryDate = tenDaysLater;
        productRef.doc(doc.id).update({ expiryDate: tenDaysLater });
    }));
    yield Promise.all(promises);
});
const addFieldAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const accountRef = firebase_1.db.collection('account');
    const querySnapshot = yield accountRef.where('deleted', '==', false).get();
    const promises = querySnapshot.docs.map((doc) => __awaiter(void 0, void 0, void 0, function* () {
        accountRef.doc(doc.id).update({ tokenNotify: '' });
    }));
    yield Promise.all(promises);
});
addFieldAccount();
