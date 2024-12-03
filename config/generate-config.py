import json
QUIZ_TITLE="Extremist Leader Commonality Quiz"
CONFIG = "config/leader-config.txt"
OUT_QUIZ = f"public/assets/{QUIZ_TITLE.replace(' ', '-')}.json"
OUT_LEADERS = ""
def main():
    lines = []
    with open(CONFIG, 'r') as f:
        lines = f.readlines()
    # print(lines)
    leaderMap = {}
    leaders = []
    RawleaderScores = {}
    leaderScores = {}
    categories = []
    rawQuiz = {}
    context = ""
    for i, l in enumerate(lines):
        l = l.strip()

        if(len(l) == 0 or l.startswith("#")): 
            continue
        elif(l.startswith("end")):
            context = ""
            continue
        elif(l.startswith("leaders")):
            context = "leaders"
            continue
        elif(l.startswith("categories")):
            context = "categories"
            continue
        else:
            # print(i, context)
            match(context):
                case "leaders":
                    temp = l.split("-")

                    abr = temp[0].strip()
                    name = temp[1].strip()

                    leaders.append(name)
                    leaderMap[abr] = name
                    RawleaderScores[name] = set()
                case "categories":
                    if(l.startswith("-")):
                        cat = categories[len(categories) - 1]
                        if(cat in rawQuiz):
                            rawQuiz[cat].append(l[1:].strip())
                        else:
                            rawQuiz[cat] = [l[1:].strip()]
                    elif(l.startswith("%")):
                        cat = categories[len(categories) - 1]
                        # print(l)
                        for abr in l[1:].strip().split(" "):
                            abr = abr.strip()
                            if(abr in leaderMap):
                                # print(abr)
                                # print(leaderMap[abr])
                                RawleaderScores[leaderMap[abr]].add(cat)
                            else:
                                print(f"Unrecognized Abrev {abr}, skipping...")
                    else:
                        categories.append(l)
    
    # post processing

    for k in RawleaderScores.keys():
        temp = []
        rs = RawleaderScores[k]
        
        for cat in categories:
            temp.append(1 if cat in rs else 0)
        
        leaderScores[k] = temp

    quiz = {"title":QUIZ_TITLE, "categories":[]}
    for cat in rawQuiz.keys():
        tc = {"title":cat, "questions":[]}
        for q in rawQuiz[cat]:
            tq = {
                "title":q,
                "alpha":1,
            }
            tc["questions"].append(tq)

        quiz["categories"].append(tc)


    print(leaderScores)
    # print(rawQuiz)
    # print(quiz)

    # print(leaders)
    # print(categories)
    # for cat in categories:
    #     print(cat, quiz[cat])
    # print(RawleaderScores)
    # print(leaderMap)
    # print(leaders)
    with open(OUT_QUIZ, 'w') as out_quiz:
        json.dump(quiz, out_quiz)
main()