import {useQuery} from "@tanstack/react-query";
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {useForm} from "@tanstack/react-form";
import {buildHttpRequest, httpClient, toHttpParams} from "../utils/api.ts";
import {Gathering, Page, SimpleSearchFiltersParams} from "../utils/types.ts";
import {ThemeContext} from "../providers/context.tsx";

export const defaultSimpleSearchFilterParams = () : SimpleSearchFiltersParams => {
    return {
        term: '',
        city: '',
        distance: 0
    }
}

export default function Search(props: Readonly<{ setGatherings: Dispatch<SetStateAction<Page<Gathering> | null>> }>) {
    const {setGatherings} = props;
    const themeContext = useContext(ThemeContext);
    const [params, setParams] = useState<SimpleSearchFiltersParams>(defaultSimpleSearchFilterParams);

    const searchQuery = useQuery<Page<Gathering>>({
        queryKey: ['search', params],
        queryFn: async () => {
            // , {searchParams: toHttpParams(params)}
            return await httpClient(buildHttpRequest('/search')).json();
        },
        enabled: false
    });

    useEffect(() => {
        if (!searchQuery.data) return;
        setGatherings(searchQuery.data);
    }, [setGatherings, searchQuery.data]);

    const form = useForm<SimpleSearchFiltersParams>({
        defaultValues: {
            term: '',
            city: '',
            distance: 0
        },
        onSubmit: async ({value}) => {
            setParams(value);
            searchQuery.refetch();
        }
    });

    function submitSearchForm(event: FormEvent) {
        event.stopPropagation();
        event.preventDefault();
        form.handleSubmit();
    }

    return (
        <>
            <div>Search avec le thème {themeContext}</div>
            {/* method="get"*/}
            <form onSubmit={submitSearchForm}>
                <form.Field
                    name="term"
                    children={(field) => (
                        <input
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                />

                <form.Field
                    name="city"
                    children={(field) => (
                        <input
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                />

                <form.Field
                    name="distance"
                    children={(field) => (
                        <input
                            type="number"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                        />
                    )}
                />
                <button type="submit">Rechercher</button>
            </form>
        </>
    );
}
