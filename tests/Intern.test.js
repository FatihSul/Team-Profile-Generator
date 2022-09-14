const Intern = require ("../lib/Intern");

test("get role gets the role", () => {
    let e = new Intern()
    expect(e.getRole()).toBe("Intern")
})