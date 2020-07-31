import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import {
  createChart,
  loadChart,
  startNewChart,
} from "../../actions/orgChartActions";
import useDownload from "../../hooks/useDownload";
import "./ActionsPanel.scss";

const EmployeeInfoPanel = ({
  sideDrawer,
  user,
  createChart,
  loadChart,
  setChartListShow,
  startNewChart,
}) => {
  const { handleDownload } = useDownload();
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowWidget(true);
    }, 1000);
  }, []);

  const handleLoadCharts = async () => {
    await loadChart();
    setChartListShow(true);
  };

  return (
    <div className={`employee-card ${showWidget ? "employee-card-show" : ""}`}>
      <div className="employee-card-close">
        <i className="fas fa-times"></i>
      </div>
      <div className="selected-employee">
        {user && <p className="name">Welcome, {user.name}</p>}
        {!user && <p className="name">Login for more functions</p>}
      </div>
      <ListGroup className="action-list">
        <ListGroup.Item
          onClick={() => createChart("default")}
          className={`action-item ${!user ? "disabled" : ""}`}
          as="button"
          action
        >
          <i class="far fa-save"></i> Save your chart
        </ListGroup.Item>
        <ListGroup.Item
          onClick={handleLoadCharts}
          className={`action-item ${!user ? "disabled" : ""}`}
          as="button"
          action
        >
          <i class="fas fa-download"></i> Load your charts
        </ListGroup.Item>
        <ListGroup.Item
          className="action-item"
          as="button"
          action
          onClick={startNewChart}
        >
          <i class="fas fa-wrench"></i> Build from scratch
        </ListGroup.Item>
        <ListGroup.Item
          className="action-item"
          as="button"
          action
          onClick={() => handleDownload("PDF")}
        >
          <i class="far fa-file-pdf"></i> Export PDF
        </ListGroup.Item>
        <ListGroup.Item
          className="action-item"
          as="button"
          action
          onClick={() => handleDownload("JPG")}
        >
          <i class="far fa-file-image"></i> Export JPG
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer, user }) => ({ sideDrawer, user });

export default connect(mapStateToProps, {
  createChart,
  loadChart,
  startNewChart,
})(EmployeeInfoPanel);
