db.createUser(
    {
        user: "borjovsky",
        pwd: "cd0841",
        roles: [
            {
                role: "readWrite",
                db: "creda"
            }
        ]
    }
);