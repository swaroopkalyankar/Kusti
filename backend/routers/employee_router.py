from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.controllers import employee_controller
from app.schemas.employee import EmployeeCreate
from app.dependencies import get_current_user

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("/")
def get_all(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return employee_controller.get_all_employees(db)

@router.post("/")
def create(data: EmployeeCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return employee_controller.create_employee(db, data)


@router.get("/{emp_id}")
def get_by_id(emp_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return employee_controller.get_employee_by_id(db, emp_id)


@router.put("/{emp_id}")
def update(emp_id: int, data: EmployeeCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return employee_controller.update_employee(db, emp_id, data)


@router.delete("/{emp_id}")
def delete(emp_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return employee_controller.delete_employee(db, emp_id)