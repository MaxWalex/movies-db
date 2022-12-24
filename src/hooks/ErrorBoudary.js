import React from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
    }
    
    render() {
      if (this.state.errorInfo) {
        return (
          <section className="error_boudary">
            <div className="container" style={{
                textAlign: 'center'
            }}>
                <h1 style={{color: '#000', fontSize: '40px', marginTop: '50px'}}>Страница в разработке!</h1>
                <div style={{color: '#000', fontSize: '20px', marginTop: '50px'}}>Вернуться на <Link to="/" style={{fontWeight: 'bold'}}>Главную</Link></div>
            </div>
          </section>
        );
      }
      return this.props.children;
    }  
  }