from sqlalchemy.orm import Session
from app.models.employee import Employee

def get_all(db: Session):
    return db.query(Employee).filter(Employee.is_deleted == False).all()

def create_emp(db, name, email):
    from app.models.employee import Employee

    # check duplicate email
    existing = db.query(Employee).filter(Employee.email == email).first()
    if existing:
        return None

    emp = Employee(name=name, email=email)
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return emp

def get_by_id(db: Session, emp_id: int):
    return db.query(Employee).filter(Employee.id == emp_id, Employee.is_deleted == False).first()

def update_emp(db: Session, emp_id: int, name: str, email: str):
    emp = get_by_id(db, emp_id)
    if emp:
        emp.name = name
        emp.email = email
        db.commit()
        db.refresh(emp)
    return emp

def soft_delete(db: Session, emp_id: int):
    emp = get_by_id(db, emp_id)
    if emp:
        emp.is_deleted = True
        db.commit()
    return emp