import React, {useState, useEffect} from 'react';
import { Link,useHistory } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import axios from 'axios';
import swal from 'sweetalert';
export default function ToDoList(props) {

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/todos').then(res=>{
            if(res.status === 200)
            {
                console.log(res.data.students);
                setStudents(res.data.students)
                setLoading(false);
            }
        });

    }, []);


    const deleteStudent = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/delete-student/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Student Data...</h4>
    }
    else
    {
        var student_HTMLTABLE = "";
        console.log(students);
        student_HTMLTABLE = students.map( (item, index) => {
            console.log(item);
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.category.id}</td>
                    <td>{item.title}</td>
                    <td>
                        <button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    return (
      <Authenticated
          auth={props.auth}
          errors={props.errors}
          header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
      >
          <Head title="Dashboard" />

          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="container">
                    <div className="row">
                        <div className='col-md-12'>
                          <div className='card'>
                                <div className="card-header">
                                  <h4> ToDoList </h4>
                                  <Link href={'addtodo'} className="btn btn-primary btn-sm float-end"> Add Todo </Link>
                                </div>
                                <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Category</th>
                                            <th>Title</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                          </div>
                        </div>
                    </div>
              </div>
                  </div>
              </div>
          </div>
      </Authenticated>
  );
}