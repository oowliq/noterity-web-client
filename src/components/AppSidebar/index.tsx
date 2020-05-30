import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Sidebar = styled.aside`
    width: 300px;
    height: 100vh;
    background: ${(props) => props.theme.colors.secondary};
    padding: 2em;
    overflow: hidden;
`;

const HeaderTitle = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.theme.fontColors.default};
    font-size: 40px;
    position: relative;
    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.colors.accent};
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 0;
        width: 200%;
        height: 1px;
        background-color: ${(props) => props.theme.colors.primary};
    }
`;

const SidebarNav = styled.nav`
    margin-top: 5em;
`;

const SidebarNavList = styled.ul``;

const SidebarNavListItem = styled.li``;

const SidebarNavListItemLink = styled(Link)`
    text-decoration: none;
    font-size: 20px;
    color: ${(props) => props.theme.fontColors.inactive};
    letter-spacing: 4px;
    display: flex;
    padding: 1em 0;
    position: relative;

    &:hover {
        color: ${(props) => props.theme.fontColors.default};
        cursor: pointer;

        &::after {
            content: '';
            position: absolute;
            left: -20px;
            top: 0;
            width: 4px;
            height: 100%;
            background: ${(props) => props.theme.colors.accent};
        }
    }
`;

const AppSidebar: FC = () => {
    return (
        <Sidebar>
            <HeaderTitle to="/">Noterity</HeaderTitle>
            <SidebarNav>
                <SidebarNavList>
                    <SidebarNavListItem>
                        <SidebarNavListItemLink to="/new-note">New Note</SidebarNavListItemLink>
                    </SidebarNavListItem>
                    <SidebarNavListItem>
                        <SidebarNavListItemLink to="/notes">Browse notes</SidebarNavListItemLink>
                    </SidebarNavListItem>
                </SidebarNavList>
            </SidebarNav>
        </Sidebar>
    );
};

export default AppSidebar;
