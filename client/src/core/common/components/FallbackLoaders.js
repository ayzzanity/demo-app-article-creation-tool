import React from "react"

import { Table } from "antd"

const EmptyLoader = <></>
const TableLoader = <Table loading={true} columns={[]} dataSource={[]} />

const FallBackLoaders = {
  EmptyLoader,
  TableLoader,
}

export default FallBackLoaders
