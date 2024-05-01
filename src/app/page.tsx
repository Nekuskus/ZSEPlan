'use client';

import { Anchor, AppShell, Burger, Collapse, Group, ScrollArea, ScrollAreaAutosize, Skeleton, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { api } from './query';
import { IndexType } from './apitypes';

export default function Home() {
    const [navOpened, { toggle: navToggle }] = useDisclosure();
    const [classesOpened, { toggle: classesToggle }] = useDisclosure(true);
    const [teachersOpened, { toggle: teachersToggle }] = useDisclosure(false);
    const [classroomsOpened, { toggle: classroomsToggle }] = useDisclosure(false);

    const [classes, setClasses] = useState([{name: '', url: ''}]);
    const [teachers, setTeachers] = useState([{name: '', url: ''}]);
    const [classrooms, setClassrooms] = useState([{name: '', url: ''}]);
    
    useEffect(() => {
        api('index').then(async (res) => {
            const json = await (res as Response).json() as IndexType;
            setClasses(json.oddzialy);
            setTeachers(json.nauczyciele);
            setClassrooms(json.sale);
        })
    }, [])

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !navOpened },
            }}
            padding="md"
        >
            <AppShell.Header p="sm">
                <Burger
                    opened={navOpened}
                    onClick={navToggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <MantineLogo size={35}/>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <ScrollArea>
                {
                    classes.length !== 1 || teachers.length !== 1 || classrooms.length !== 1 ?
                        <>
                            <Title order={2} h={28} mt="sm" mb="md" onClick={classesToggle}>Oddziały {classesOpened ? <i className='icon-up-open'></i> : <i className='icon-down-open'></i>}</Title>
                            <Collapse in={classesOpened}>
                                <Stack pb={20}>
                                {
                                    classes.map((value, i) => (
                                        <Anchor key={i} ml={28} href={value.name}>{value.name}</Anchor>
                                    ))
                                }
                                </Stack>
                            </Collapse>
                            <Title order={2} h={28} mt="sm" mb="md" onClick={teachersToggle}>Nauczyciele {teachersOpened ? <i className='icon-up-open'></i> : <i className='icon-down-open'></i>}</Title>
                            <Collapse in={teachersOpened}>
                                <Stack pb={20}>
                                {
                                    teachers.map((value, i) => (
                                        <Anchor key={i} ml={28} href={value.name}>{value.name}</Anchor>
                                    ))
                                }
                                </Stack>
                            </Collapse>
                            <Title order={2} h={28} mt="sm" mb="md" onClick={classroomsToggle}>Sale {classroomsOpened ? <i className='icon-up-open'></i> : <i className='icon-down-open'></i>}</Title>
                            <Collapse in={classroomsOpened}>
                                <Stack pb={20}>
                                {
                                    classrooms.map((value, i) => (
                                        <Anchor key={i} ml={28} href={value.name}>{value.name}</Anchor>
                                    ))
                                }
                                </Stack>
                            </Collapse>
                        </>
                    :
                        Array(3)
                        .fill(0)
                        .map((_, i) => (
                            <Fragment key={i}>
                                <Skeleton h={28} mt="sm" animate={true}/>
                                <Stack pb={20}>
                                    {
                                        Array(7)
                                        .fill(0)
                                        .map((_, i) => (
                                            <Skeleton key={i} ml={28} h={28} mt="sm" animate={true}/>
                                        ))
                                    }
                                </Stack>
                            </Fragment>
                        ))
                }
                </ScrollArea>

            </AppShell.Navbar>

            <AppShell.Main>Main</AppShell.Main>
        </AppShell>
    );
}
