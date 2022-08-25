import React, { useState, useEffect  } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head,Link } from '@inertiajs/inertia-react';
import axios from 'axios';
import swal from 'sweetalert';

export default function AddTodo(props) {

    const [loading, setLoading] = useState(true);
    const [category_id,setCategory] = useState("");
    const [title,setTitle]          = useState("");
    const [categorieslist, setCategoriesList] = useState([]);

    useEffect(() => {
        // fetch categories via api
        axios.get('http://127.0.0.1:8000/api/categories').then(res=>{
            if(res.status === 200)
            {
                console.log(res.data.category);
                setCategoriesList(res.data.category)
                setLoading(false);
            }
        });

    }, []);
    // check
    if(loading)
    {
        // return <h4>Loading Student Data...</h4>
    }
    else
    {
        console.log(categorieslist);

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
                                                {categorieslist.map((option, index) => (
                                                    <option  value={option.id}>
                                                    {option.name}
                                                    </option>
                                                ))}
                                            </select>
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