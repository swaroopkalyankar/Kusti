from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.services import employee_service
from app.schemas.employee import EmployeeCreate

def get_all_employees(db: Session):
    employees = employee_service.get_all(db)
    return employees

def create_employee(db, data):
    emp = employee_service.create_emp(db, data.name, data.email)

    if not emp:
        raise HTTPException(status_code=400, detail="Email already exists")

    return emp

def get_employee_by_id(db: Session, emp_id: int):
    emp = employee_service.get_by_id(db, emp_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp


def update_employee(db: Session, emp_id: int, data: EmployeeCreate):
    emp = employee_service.update_emp(db, emp_id, data.name, data.email)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp


def delete_employee(db: Session, emp_id: int):
    emp = employee_service.soft_delete(db, emp_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee soft deleted"}