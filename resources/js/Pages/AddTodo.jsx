import React, { useState, useEffect  } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head,Link } from '@inertiajs/inertia-react';
import axios from 'axios';
import swal from 'sweetalert';

// const Categories = [
//   { label: "Urgent", value: 1 },
//   { label: "Medium", value: 2 },
//   { label: "Unimportant", value: 3 }
// ];
export default function AddTodo(props) {

    const [loading, setLoading] = useState(true);
    const [category_id,setCategory] = useState("");
    const [title,setTitle]          = useState("");
    const [categorieslist, setCategoriesList] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/categories').then(res=>{
            if(res.status === 200)
            {
                console.log(res.data.category);
                setCategoriesList(res.data.category)
                setLoading(false);
            }
        });

    }, []);

    if(loading)
    {
        return <h4>Loading Student Data...</h4>
    }
    else
    {
        var category_HTMLTABLE = "";
        console.log(categorieslist);
        // category_HTMLTABLE = categorieslist.map( (item, index) => {
        //     console.log(item);
        //     return (
        //         <option value={item.id}>
        //             {item.name}
        //         </option>
        //     );
        // });

    }

    function submitCall(e) {
        e.preventDefault();
        if(!setCategory || !setTitle){
            alert('Category or Title cannot be blank');
        }
        else{
                const Post = {'category_id': category_id, 'title': title}
                axios.post(`/posttodo`, Post).then(res => {

                    if(res.data.success === true)
                    {
                        swal("Success!",res.data.message,"success");
                        setTitle('');
                        setCategory('');
                        // Redirect to another route
                        window.location.href = "/todolist";
                    }
                });


            //   const res = await axios.post('http://127.0.0.1:8000/posttodo',Post);
            //   if(res.data.status === 200)
            //   {
            //       //   console.log(res.data.message);
            //       //   this.setTitle('');
            //       //   this.setCategory('');
            //       //   history.push('/todolist');
            //       swal("Success!",res.data.message,"success");
            //     //   history.push('/todolist');
            //   }
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Todo</h2>}
        >
        <Head title="Add Todo" /> <div className="container">
                        <div className="row">
                          <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4> Add Todo </h4>
                                    <Link href={'dashboard'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={submitCall} method="post">
                                        <div className='form-group mb-3'>
                                            <label>Category</label>
                                            <select
                                                value={category_id}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className='form-control'>
                                                {/* <option selected value="1">Urgent</option>
                                                <option value="2">Medium</option>
                                                <option value="3">Unimportant</option> */}
                                                {categorieslist.map((option, index) => (
                                                    <option  value={option.id}>
                                                    {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <select id="category_id" onChange={(e) => setCategory(e.target.value)} >
                                                 <option value="1"> dsds </option></select> */}
                                        </div>

                                        <div className='form-group mb-3'>
                                            <label>Title</label>
                                            <input type="text" id="title"  onChange={(e) => setTitle(e.target.value)} value={title} className='form-control' />
                                        </div>
                                        <div className='form-group mb-3'>
                                        <button type="submit" className="btn btn-primary active">Add Todo</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                          </div>
                      </div>
                </div>
        </Authenticated>
    );
}