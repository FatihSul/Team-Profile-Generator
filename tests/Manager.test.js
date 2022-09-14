const Manager = require ("../lib/Manager");

test("get role gets the role", () => {
    let e = new Manager()
    expect(e.getRole()).toBe("Manager")
})