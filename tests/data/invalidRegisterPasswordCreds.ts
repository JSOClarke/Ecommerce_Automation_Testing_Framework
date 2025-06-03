export const invalidRegisterPasswordCreds = [
  {
    "firstName": "User1",
    "lastName": "Test",
    "street": "123 Test St",
    "postCode": "AB1 2CD",
    "city": "London",
    "state": "Greater London",
    "country": "Albania",
    "phone": "447911123456",
    "email": "user1@example.com",
    "password": "Ab1@",           // Fails length (too short)
    "dob": "1990-01-01"
  },
  {
    "firstName": "User2",
    "lastName": "Test",
    "street": "456 Test Ave",
    "postCode": "XY9 8ZT",
    "city": "Manchester",
    "state": "Greater Manchester",
    "country": "Albania",
    "phone": "447912345678",
    "email": "user2@example.com",
    "password": "abcdefg1@",      // Fails uppercase (no uppercase letters)
    "dob": "1985-05-15"
  },
  {
    "firstName": "User3",
    "lastName": "Test",
    "street": "789 Test Blvd",
    "postCode": "CD3 4EF",
    "city": "Bristol",
    "state": "South West",
    "country": "Albania",
    "phone": "447913579246",
    "email": "user3@example.com",
    "password": "ABCDEFGH@",      // Fails lowercase (no lowercase letters)
    "dob": "1980-03-22"
  },
  {
    "firstName": "User4",
    "lastName": "Test",
    "street": "101 Test Rd",
    "postCode": "EF5 6GH",
    "city": "Leeds",
    "state": "West Yorkshire",
    "country": "Albania",
    "phone": "447914682357",
    "email": "user4@example.com",
    "password": "Abcdefgh@",      // Fails number (no digit)
    "dob": "1992-07-12"
  },
  {
    "firstName": "User5",
    "lastName": "Test",
    "street": "202 Test Ln",
    "postCode": "GH7 8IJ",
    "city": "Edinburgh",
    "state": "Scotland",
    "country": "Albania",
    "phone": "447915794680",
    "email": "user5@example.com",
    "password": "Abcdefg12",      // Fails special symbol (no special char)
    "dob": "1988-11-30"
  }
]
