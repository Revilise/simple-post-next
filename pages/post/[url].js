import postsController from "../../db/controllers/posts.controller";
import Layout from "../../components/Layout/Layout";
import PostDetails from "../../components/PostDetails/PostDetails";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Main from "../../components/Main/Main";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";

export default function Post(props) {
    const router = useRouter();
    const url = router.query.url;
    const [isFetch, changeIsFetch] = useState(false);
    const [data, setData] = useState(Object.create(null));

    function deletePost() {
        const {id} = props;
        postsController.deleteById(id).then(() => router.push('/pages'));
    }

    useEffect(() => {
        changeIsFetch(true);
        if (url) {
            postsController.getOne(router.query.url)
                .then((res) => setData(res))
                .then(() => changeIsFetch(false))
        }
    }, [url])

    return (
        <Layout>
            <Header>
                <Search />
                <Button onClick={() => router.push('/pages')}>back</Button>
            </Header>
            <Main>
                <Main.Aside>
                    <Sidebar/>
                </Main.Aside>
                <Main.Section>
                    { isFetch ? <Loading /> : <PostDetails {...data} />}
                </Main.Section>
            </Main>
        </Layout>
    )
}