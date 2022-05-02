import { createServer } from "miragejs";

let accounts = [
  { id: 1, email: "nume@yahoo.com", password: "parola" },
  { id: 2, email: "nume2@yahoo.com", password: "parola2" },
  { id: 3, email: "name23@yahoo.com", password: "parola23" }
];

createServer({
  routes() {
    this.namespace = "api";

    this.get("/accounts", () => {
      return {
        accounts,
      };
    });
  },
});
