# LinkAPI ⚡
✅ Integration between pipedrive and Bling
![node](https://user-images.githubusercontent.com/26586585/75612422-f747e380-5b01-11ea-9213-ec9742b66a47.png)

### Structure:

```
  clinic
    |_ public
        |_ coverage
        |_ Postman
    |_ src
        |_ modules
            |_ Order
                  |_ __tests__
                        |_> Order.spec.ts
                  |_ dtos
                        |_> IOrderDTO.ts
                        |_> IOrderFakeDTO.ts
                  |_ fakes
                        |_> OrderFake.ts
                  |_ infra
                        |_ http  
                            |_ controllers
                                |_> OrderController.ts
                            |_ routes
                                |_> order.routes.ts
                            |_ template
                                |_> blingXML.ts
                        |_ mongoose
                            |_ schemas
                                |_> Order.ts
                        |_ services
                             |_> blingAPI.ts
                              
                  |_ repositories
                        |_> IOrderRepository.ts
           
        |_ shared
              |_ errors
                   |_> AppError.ts
              |_ infra
                   |_ http
                       |_ routes
                            |_> route.ts
                       |_ app.ts
                       |_ server.ts
                   |_> bootstrap.ts     
             
```

### Docs:

1. PostMan ( https://documenter.getpostman.com/view/9357385/TVYKawNv)
2. PostMan Collection ( public/Postman/linkApi.postman_collection.json )
3. docs
4. Code Coverage ( linkApi/public/coverage/lcov-report/index.html )
5. Insominia.json

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/064a9b5074e8b2a4bb7e)

### Setting up local environment:

1. Install **Yarn**;
2. Using terminal, navigate to the folder where the project was cloned and run:<br> **git clone https://github.com/k2madureira/linkApi.git**
3. Using terminal, access the **linkApi** folder and Run **yarn install**, to download all necessary dependencies;
4. Using terminal run **yarn dev:server**, to start the server on port **3333**; (Typescript)
5. For testing, the **insomnia** software is recommended;
6. To perform the unit test **yarn test**

### Tests:
- [x] **Jest**
- [x] **Code coverage**

### code formatter / Extensions:

- [x] **Eslint** (Airbnb)
- [x] **Eslint** (Visual Studio Code - Extension)
- [x] **Prettier**
- [x] **EditorConfig** (Visual Studio Code - Extension)


### Endpoints:

|Number| Type | Route | Definition |
|-|------|-------|------------|
|1| *Post* | /order | Create an order |
|2| *Get* | /order/all | List Order |




#### Exemples:


1. http://localhost:3333/order **(POST)**

##### Request [ body: JSON]
```
{}
```

##### Response [JSON]

```
{
  "Deals": [
    [
      {
        "name": "__NAME__",
        "person_name": "__TEST__",
        "code": 2,
        "title": "__TESTE__",
        "unitValue": 50,
        "currency": "BRL",
        "formatedValue": "R$ 50",
        "addDate": "2020-10-29"
      }
    ]
  ]
}
 ```

 ------------------------------------------------------------
 
 2. http://localhost:3333/order/all **(GET)**

##### Response [JSON]

```
[
  {
    "id_order": "2",
    "company": "__TESTE__",
    "contact_person": "__TESTE__",
    "detail": {
      "code": "2",
      "description": "__TESTE__",
      "currency": "BRL",
      "total_value": 50,
      "formatted_weighted_value": "R$ 50"
    },
    "created_at": "2020-10-29"
  }
]
 ```

 ------------------------------------------------------------

