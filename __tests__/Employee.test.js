const Employee = require ("../lib/Employee");

test("get role gets the role", () => {
    let e = new Employee()
    expect(e.getRole()).toBe("Employee")
})