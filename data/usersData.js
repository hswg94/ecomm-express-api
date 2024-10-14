import bcrypt from "bcryptjs";

const usersData = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: await bcrypt.hash('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: await bcrypt.hash('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: await bcrypt.hash('123456', 10),
        isAdmin: false,
    },
];

export default usersData;