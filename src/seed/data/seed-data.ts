export const SEED_USERS = [
    {
        id: 1,
        email: 'admin@correo.com',
        password: 'Abc123',
        fullname: 'Admin poderoso',
        rol: 'administrador',
        phone: '987654321',
        isActive: true
    },
    {
        id: 2,
        email: 'prueba@correo.com',
        password: 'Abc123',
        fullname: 'Juan Pablo',
        rol: 'trabajador',
        phone: '987654321',
        isActive: true
    },
    {
        id: 3,
        email: 'prueba3@correo.com',
        password: 'Abc123',
        fullname: 'Alfonso Ugarte',
        rol: 'trabajador',
        phone: '987654321',
        isActive: true
    },
    {
        id: 4,
        email: 'prueba5@correo.com',
        password: 'Abc123',
        fullname: 'Manuel Ugarte',
        rol: 'trabajador',
        phone: '987654321',
        isActive: true
    },
    {
        id: 5,
        email: 'prueba2@correo.com',
        password: 'Abc123',
        fullname: 'Felix Caneda',
        rol: 'trabajador',
        phone: '987654321',
        isActive: true
    },
    {
        id: 6,
        email: 'prueba4@correo.com',
        password: 'Abc123',
        fullname: 'Manuel Ugarte',
        rol: 'trabajador',
        phone: '987654321',
        isActive: false
    }
]

export const SEED_CLIENTS= [
    [
        {
            id: 1,
            fullname: ' Mario Aguilar',
            email: 'mario@hotmail.com',
            phone: '+51 987633221 '
        },
        {
            id: 2,
            fullname: ' Juan Castillo',
            email: 'juan@gmail.com',
            phone: '+51 987678980 '
        },
        {
            id: 3,
            fullname: ' Marcia Chalco',
            email: 'marcia@gmail.com',
            phone: '+51 987633221 '
        }
    ]
]

export const SEED_SUPPLIERS= [
    {
        id: 1,
        fullname: 'Importadero S.A.C. 123',
        email: 'importadero@correo.com',
        phone: '+51 923756888 '
    },
    {
        id: 2,
        fullname: 'Heltf SAC322',
        email: 'medic@correo.com',
        phone: '+51 999888777 '
    },
    {
        id: 3,
        fullname: 'Importadero SAC',
        email: 'hola@correo.com',
        phone: '+51 963852741 '
    }
]
export const SEED_CATEGORIES = [
    { id: 1, name: 'Tableta' },
    { id: 2, name: 'Jarabe' }
]

export const SEED_PRODUCTS = [
    {
        id: 20,
        description: 'Vitamina C',
        stock: 30,
        image: 'b14fb1b771104dd874dcb9feb503c1bd.jpg',
        priceCost: '16.88',
        gain: '1.60',
        saleUnitPrice: '27.01'
    },
    {
        id: 21,
        description: 'Gingisona',
        stock: 22,
        image: '118f12473d589c45238c6aa31ad34046.jpg',
        priceCost: '25.00',
        gain: '1.55',
        saleUnitPrice: '38.75'
    },
    {
        id: 22,
        description: 'Panadol',
        stock: 8,
        image: '5e0f7574caab63171225949aa43b65f0.jpg',
        priceCost: '25.00',
        gain: '1.45',
        saleUnitPrice: '36.25'
    },
    {
        id: 23,
        description: 'Vitamina A',
        stock: 0,
        image: '3a3ab6f10c7a2d938cb9e8d3dba185b6.jpg',
        priceCost: '24.67',
        gain: '1.62',
        saleUnitPrice: '39.97'
    },
    {
        id: 24,
        description: 'Paracetamol',
        stock: 26,
        image: 'bddb6daa44da40f052687a41020281c8.jpg',
        priceCost: '16.62',
        gain: '1.55',
        saleUnitPrice: '25.76'
    },
    {
        id: 26,
        description: ' Amoxicilina',
        stock: 25,
        image: 'b747ee3e0e1dcacf1ec6f8c0878fa869.jpg',
        priceCost: '20.00',
        gain: '1.60',
        saleUnitPrice: '32.00'
    }
]

export const SEED_PURCHASE_ORDERS =  [
    {
        id: 37,
        date: '2023-06-14',
        fullPurchasePrice: '830.00'
    },
    {
        id: 38,
        date: '2023-06-12',
        fullPurchasePrice: '1152.00'
    },
    {
        id: 50,
        date: '2023-06-20',
        fullPurchasePrice: '300.00'
    },
    {
        id: 51,
        date: '2023-06-20',
        fullPurchasePrice: '252.00'
    },
    {
        id: 52,
        date: '2023-06-20',
        fullPurchasePrice: '500.00'
    },
    {
        id: 53,
        date: '2023-06-20',
        fullPurchasePrice: '400.00'
    },
    {
        id: 54,
        date: '2023-07-24',
        fullPurchasePrice: '270.00'
    },
    {
        id: 55,
        date: '2023-07-24',
        fullPurchasePrice: '240.00'
    },
    {
        id: 56,
        date: '2023-07-25',
        fullPurchasePrice: '253.20'
    },
    {
        id: 57,
        date: '2023-07-25',
        fullPurchasePrice: '200.00'
    }
]

export const SEED_SALES_ORDERS = [
    { id: 29, date: '2023-06-14', fullSalePrice: '134.40' },
    { id: 30, date: '2023-06-12', fullSalePrice: '208.80' },
    { id: 31, date: '2023-06-13', fullSalePrice: '156.60' },
    { id: 32, date: '2023-06-14', fullSalePrice: '104.40' },
    { id: 33, date: '2023-06-14', fullSalePrice: '156.60' },
    { id: 42, date: '2023-06-20', fullSalePrice: '192.00' },
    { id: 43, date: '2023-06-20', fullSalePrice: '217.50' },
    { id: 44, date: '2023-07-24', fullSalePrice: '279.40' },
    { id: 45, date: '2023-07-24', fullSalePrice: '270.10' },
    { id: 46, date: '2023-07-25', fullSalePrice: '507.50' },
    { id: 47, date: '2023-07-25', fullSalePrice: '1199.10' }
]

export const SEED_PURCHASE_ORDERS_DETAILS = []

export const SEED_SALES_ORDERS_DETAILS = []