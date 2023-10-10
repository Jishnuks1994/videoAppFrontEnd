import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getHistory } from '../service/allApis';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom';




function History() {
    const [history, setHisroty] = useState([])

    const getAllHistory = async () => {
        const { data } = await getHistory()
        setHisroty(data);
    }


    useEffect(() => {
        getAllHistory()
    }, [])
    console.log(history);

    return (
        <div>
            <Container>
                <h1 className='text-center py-2 mt-1'>Video Watch History</h1>

                <Table striped bordered hover className='mt-3 text-center mb-5'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Video Title</th>
                            <th>URL</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            history.length > 0 ? history.map((i, index) =>
                            (<tr>
                                <td>{index + 1}</td>
                                <td>{i?.cardName}</td>
                                <td><a href={i?.url} className='link link-dark link-underline-opacity-0' target="blank">{i?.url}</a></td>
                                <td>{i?.date}</td>
                            </tr>)
                            ) :
                                <h2 className='text-center'>
                                    Not watched any videos
                                </h2>
                        }

                    </tbody>
                </Table>

                <Link  to={"/home"} >
                    <div className='text-end mb-2'>
                        <button className='btn me-auto' style={{ background: "#f25a5a", color: 'white'  }}>
                            <Home></Home>
                            </button>
                    </div>
                </Link>
            </Container>

        </div>
    )
}

export default History