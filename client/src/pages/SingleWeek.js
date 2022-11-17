function SingleWeek (props) {
    const weekNum = parseInt(props.week);
    return (
        <section>
            <h2>Week 13</h2>
            <WeekGames week={weekNum} />
        </section>
    );
};