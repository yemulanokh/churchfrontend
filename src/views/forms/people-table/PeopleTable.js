import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ExcelJS from 'exceljs'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import DataTable from 'react-data-table-component'
import axios from '../../../axios.js'
import { UserContext } from '../../../context/UserContext.js'

function PeopleTable() {
  const token = useContext(UserContext)

  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [people, setPeople] = useState([])
  const [data1, setData1] = useState([])
  const [search, setSearch] = useState('')
  const [filteredChurches, setFilteredChurches] = useState([])
  const customStyles = {
    headCells: {
      style: { background: 'black', color: 'white' },
    },
    rows: {
      style: { marginTop: '10px', width: '100%' },
    },
    DataTable: {
      style: { color: 'red', width: '100%' },
    },
    columns: {
      style: { wrap: true },
    },
  }

  const getData = async () => {
    const response = await axios.get('/api/people', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data1 = response.data.data[0]

    data1.reverse().map((data1) => {
      const part1 = data1.mobileNo.substr(0, 3) + '-'
      const part2 = data1.mobileNo.substr(3, 3) + '-'
      const part3 = data1.mobileNo.substr(6)
      data1.mobileNo = part1 + part2 + part3
      const p1 = data1.zipcode.substr(0, 5) + '-'
      const p2 = data1.zipcode.substr(5)
      data1.zipcode = p1 + p2
      const part11 = data1.telNo.substr(0, 3) + '-'
      const part12 = data1.telNo.substr(3, 3) + '-'
      const part13 = data1.telNo.substr(6)
      data1.telNo = part11 + part12 + part13
      setData((data) => [...data, data1])
    })
  }
  useEffect(() => {
    getData()
  }, [])
  const handleClick = (row, e) => {
    e.preventDefault()
    console.log(row)
    localStorage.setItem('user', 'ind')
    navigate('/forms/contribution-form/', { state: { row, type: 'ind' } })
  }

  const column = [
    {
      name: <strong>Name</strong>,
      selector: (row) => row.firstName,
    },

    {
      name: <strong>City</strong>,
      selector: (row) => row.city,
    },

    {
      name: <strong>Mobile</strong>,
      selector: (row) => row.mobileNo,
    },
    {
      name: <strong>Gender</strong>,
      selector: (row) => row.gender,
      minWidth: true,
      wrap: true,
      wrapText: true,
    },
    {
      name: <strong>Email</strong>,

      selector: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
      // wrap: true,
    },
    {
      name: <strong>Action</strong>,
      cell: (row) => (
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.setItem('peopleID', row.peopleID)
              localStorage.setItem('localData', 'edit')
              navigate('/forms/form-control', { state: row })
            }}
            style={{ width: '4em', height: 'auto' }}
          >
            Edit
          </button>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              handleClick(row, e)
            }}
            style={{ width: '5em', height: 'auto' }}
          >
            Donate
          </button>
        </div>
      ),
      minWidth: true,
    },
  ]
  useEffect(() => {
    setData1(data)
    setFilteredChurches(data)
  }, [data])

  useEffect(() => {
    const result = filteredChurches.filter((filteredChurches) => {
      return filteredChurches.firstName.toLowerCase().match(search.toLowerCase())
    })
    setFilteredChurches(result)
    if (search === '') {
      setFilteredChurches(data1)
    }
  }, [search])
  const exportData = () => {
    const fileName = 'simple.xlsx'
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('my sheet')
    sheet.columns = [
      //   { header: "id", key: "id", width: 10 },
      { header: 'name', key: 'name', with: 32 },
      { header: 'description', key: 'description', width: 32 },
      { header: 'address1', key: 'address1', width: 32 },
      { header: 'city', key: 'city', width: 32 },
      { header: 'state', key: 'stateId', width: 32 },
      { header: 'zipcode', key: 'zipcode', width: 32 },
      { header: 'mobile', key: 'mobile', width: 32 },
      { header: 'email', key: 'email', width: 32 },
      { header: 'url', key: 'url', width: 32 },
    ]
    sheet.addRow({
      name: data.firstName,
      description: data.description,
      address1: data.address1,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      mobile: data.mobile,
      email: data.email,
      url: data.url,
    })
    workbook.xlsx
      .writeBuffer(fileName)
      .then(() => {
        console.log('file created')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="text-center">
      <CCard className="mt-3">
        <CCardHeader className="bg-dark">
          <h3 className="text-white">Individual Table</h3>
        </CCardHeader>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link to="">
              <CButton color="primary" onClick={window.print}>
                Print
              </CButton>
            </Link>
            <Link to="">
              <CButton color="primary" onClick={exportData}>
                Export
              </CButton>
            </Link>
            <Link to="/forms/form-control/">
              <CButton
                color="primary"
                onClick={() => {
                  localStorage.setItem('peopleID', null)
                  localStorage.setItem('localData', 'add')
                }}
              >
                Add New Individual
              </CButton>
            </Link>
            <div className="ms-auto mb-3">
              <input
                type="text"
                placeholder="Search Here"
                className="p-2 form-control"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
              />
            </div>
          </div>
          <DataTable
            columns={column}
            data={filteredChurches}
            pagination
            customStyles={customStyles}
            fixedHeader
            selectableRows
            selectableRowsHighlight
            highlightOnHover
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default PeopleTable
