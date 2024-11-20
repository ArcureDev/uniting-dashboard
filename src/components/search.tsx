import {useQuery} from "@tanstack/react-query";
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {useForm} from "@tanstack/react-form";
import {buildHttpRequest, httpClient, toHttpParams} from "../utils/api.ts";
import {DashboardParams} from "../utils/types.ts";
import {ThemeContext} from "../providers/context.tsx";
import {getIsoDate, getTomorrowDate} from "../utils/utils.ts";
import {ChartShallowDataShape} from "reaviz";

const defaultDashboardParams = () : DashboardParams => {
    return {
        startDate: getIsoDate(new Date()),
        endDate: getIsoDate(getTomorrowDate())
    }
}

export default function Search(props: Readonly<{ setData: Dispatch<SetStateAction<ChartShallowDataShape[] | undefined>> }>) {
    const {setData} = props;
    const themeContext = useContext(ThemeContext);
    const [params, setParams] = useState<DashboardParams | undefined>(undefined);

    const searchQuery = useQuery<ChartShallowDataShape[]>({
        queryKey: ['search', params],
        queryFn: async () => {
            const options = params ? {searchParams: toHttpParams(params)} : {};
            return await httpClient(buildHttpRequest('/dashboard'), options).json();
        },
        enabled: false
    });

    useEffect(() => {
        if (!searchQuery.data) return;
        setData(searchQuery.data);
    }, [setData, searchQuery.data]);

    useEffect(() => {
        if (!params) return;
        searchQuery.refetch();
    }, [params]);

    const form = useForm<DashboardParams>({
        defaultValues: defaultDashboardParams(),
        onSubmit: async ({value}) => {
            setParams(value);
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
            <form onSubmit={submitSearchForm}>
                <form.Field
                    name="startDate"
                    children={(field) => (
                        <input
                            type={"date"}
                            name={field.name}
                            value={getIsoDate(field.state.value)}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(getIsoDate(e.target.valueAsDate))}
                        />
                    )}
                />

                <form.Field
                    name="endDate"
                    children={(field) => (
                        <input
                            type={"date"}
                            name={field.name}
                            value={getIsoDate(field.state.value)}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(getIsoDate(e.target.valueAsDate))}
                        />
                    )}
                />
                <button type="submit">Rechercher</button>
            </form>
        </>
    );
}
