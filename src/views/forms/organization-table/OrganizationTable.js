import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import DataTable from 'react-data-table-component'
import ExcelJS from 'exceljs'
import axios from '../../../axios.js'
import { UserContext } from '../../../context/UserContext.js'

const OrganizationTable = () => {
  const token = useContext(UserContext)

  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [data1, setData1] = useState([])
  const navigate = useNavigate()
  const [filteredOrganization, setFilteredOrganization] = useState([])
  const getData = async () => {
    const response = await axios.get('/api/organization', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data1 = response.data.data[0]
    data1.reverse().map((data1) => {
      const part1 = data1.mobileNo.substr(0, 3) + '-'
      const part2 = data1.mobileNo.substr(3, 3) + '-'
      const part3 = data1.mobileNo.substr(6)
      data1.mobileNo = part1 + part2 + part3
      const p1 = data1.zipcode.substr(0, 3) + '-'
      const p2 = data1.zipcode.substr(3)
      data1.zipcode = p1 + p2
      const part11 = data1.telNo.substr(0, 3) + '-'
      const part12 = data1.telNo.substr(3, 3) + '-'
      const part13 = data1.telNo.substr(6)
      data1.telNo = part11 + part12 + part13
      setData([...data, data1])
    })
  }
  useEffect(() => {
    getData()
  }, [])
  const handleClick = (row, e) => {
    e.preventDefault()
    if (e.target.id === 'donate') {
      localStorage.setItem('user', 'org')
      navigate('/forms/contribution-form/', { state: { row, type: 'org' } })
    }
    if (e.target.id === 'edit') {
      localStorage.setItem('localData', 'edit')
      navigate('/forms/organization-form/', { state: row })
    }
  }
  const column = [
    {
      name: <strong>Name</strong>,
      selector: (row) => row.name,
      sortable: true,
      left: true,
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
      name: <strong>email</strong>,
      selector: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
    },
    {
      name: <strong>URL</strong>,
      selector: (row) => (
        <a href={row.url} target="_blank" rel="noreferrer">
          {row.url}
        </a>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex justify-content-between gap-3">
          <button
            className="btn btn-primary"
            id="edit"
            style={{ width: '4em', height: 'auto' }}
            onClick={(e) => handleClick(row, e)}
          >
            Edit
          </button>

          <button
            className="btn btn-primary"
            id="donate"
            style={{ width: '5em', height: 'auto' }}
            onClick={(e) => handleClick(row, e)}
          >
            Donate
          </button>
        </div>
      ),
    },
  ]
  useEffect(() => {
    setData1([...data1, ...data])
    setFilteredOrganization([...filteredOrganization, ...data])
  }, [data])
  useEffect(() => {
    const result = filteredOrganization.filter((church) => {
      return church.name.toLowerCase().match(search.toLowerCase())
    })
    setFilteredOrganization(result)
    if (search === '') {
      setFilteredOrganization(data1)
    }
  }, [search])
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
    cells: {
      style: {},
    },
  }
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
      name: data.name,
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
  const addNew = (e) => {
    e.preventDefault()
    localStorage.setItem('localData', 'add')
  }
  return (
    <div className="text-center">
      <CCard className="mt-3">
        <CCardHeader className="bg-dark">
          <h3 className="text-white">Organization Table</h3>
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
            <Link to="/forms/organization-form/">
              <CButton color="primary" onClick={() => localStorage.setItem('localData', 'add')}>
                Add New Organization
              </CButton>
            </Link>

            <div className="ms-auto mb-3">
              <input
                type="text"
                placeholder="Search Here"
                className="p-2 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <DataTable
            columns={column}
            data={filteredOrganization}
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

export default OrganizationTable
