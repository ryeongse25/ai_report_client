import { useState } from "react";
import { Container } from "../components/CommonStyles";
import Header from "../components/header/Header";
import Body from "../components/main/Body";
import Menu from "../components/main/Menu";
import CalendarComponent from '../components/main/CalendarComponent';
import Notification from './NotificationPage';
import UserInfo from '../components/main/UserInfo';
import Stats from '../components/main/Stats';
import '../components/styles.css';

const Main = () => {
    const [category, setCategory] = useState('대시보드');

    const chooseCategory = (category) => {
        setCategory(category);
    }

    return (
        <>
            <Header />
            <Container>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    </div>
                    <div style={{ flex: 5, position: 'relative' }}>
                        {category === '대시보드' && (
                            <div style={{ position: 'relative' }}>
                                {/* 대시보드 내용이 들어가는 부분 */}
                                <Body category={category} style={{ height: '100%' }} />
                                {/* 대시보드 위에 캘린더를 배치 */}
                                <CalendarComponent />
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Main;
