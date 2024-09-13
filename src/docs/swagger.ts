import swaggerAutogen from "swagger-autogen";


const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Hendra Co Ltd",
    description: "Dokumentasi API Hendra Co Ltd",
  },
  servers: [
    {
      url: "https://sanber-vercel.vercel.app/api",
      description: "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        email: "joni2024@yopmail.com",
        password: "123412341",
      },
      RegisterRequest: {
        fullName: "joni joni",
        username: "joni2024",
        email: "joni2024@yopmail.com",
        password: "123412341",
        confirmPassword: "123412341",
      },
      UpdateProfileRequest: {
        fullName: "joni joni",
        username: "joni2024",
        email: "joni2024@yopmail.com",
        password: "123412341",
        confirmPassword: "123412341",
      },
      OrderCreateRequest: {
        "grandTotal": 15000,
        "orderItems": [
          {
            "name": "Kemeja kadita",
            "productId": "66d2d707352121e4ecdf19b9",
            "price": 15000,
            "quantity": 1
          }
        ]
      }
    },
  },
};


const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];









swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);

