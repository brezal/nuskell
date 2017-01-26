#
# Luca Cardelli's translation scheme from "Strand Algebras for DNA
# Computing", Natural Computing, 10: 407-428, 2011. Can be found at
# http://lucacardelli.name/
#
#   Note: * this implements the scheme shown in Fig 9-10, but without garbage
#           collection. Note that the gate species at the bottom seems like 
#           one molecule, but it is in fact two molecules because of an 
#           arrowhead separating them.
#
#         * In addition to the reactions describe in the paper, the 
#           spontaneous reaction ' -> A' is implemented as 'f -> A' 
#           where f is a fuel strand.
#
# Coded by Seung Woo Shin (seungwoo.theory@gmail.com).
# modified by Stefan Badelt (badelt@caltech.edu)
#

class formal(s) = "? t b"
                | ". . ."
    where {
        t = short();
        b = long() };

class signal() = "? t b"
               | ". . ."
    where {
        t = short();
        b = long() };

macro input(s)
    = ["xt + xb"
     | "(  + (",
       "xb* xt*"
     | ")   )"]
    where {
        xt = s.t;
        xb = s.b };

macro output(s)
    = ["yh yt yb +"
     | "(   (  . +",
       "yt* yh*"
     | ")   )",
       "yh yt"
     | ".  . "]
    where {
        yh = long();
        yt = s.t;
        yb = s.b };

class helper(r) =
    if len(r) < 2 then
        []
    else
        ["b t" | ". ."] + helper(tail(r))
        where {
            b = (r[0]).b;
            t = (r[1]).t };

class nmgate(r, p)
    = [ "x1b in1 t + out1 out2 t* in2 x1b* x1t*"
      | " (   ~  ( +  ~     ~  )   ~   )    .",
        "t out3"
      | ".  ~",
        "l t"
      | ". ."] + inf
    where {
        x1b = (r[0]).b;
        x1t = (r[0]).t;
        t = short();
        [in1, in2r] = flip(map(input, tail(r)), 2);
        inf = helper(r);
        l = ((reverse(r))[0]).b;
        [out1, out2r, out3] = flip(map(output, p), 3);
        in2 = reverse(in2r);
        out2 = reverse(out2r) };

module nmmodule(r, p) = sum(map(infty, sp))
    where
        sp = nmgate(r, p);

module reaction(r) =
    if len(r.products) == 0 then
        nmmodule(r.reactants, [i])
        where
            i = signal()
    else if len(r.reactants) == 0 then
        nmmodule([i], r.products) + infty(i)
        where
            i = signal()
    else
        nmmodule(r.reactants, r.products);

module main(crn) = sum(map(reaction, crn))
  where crn = irrev_reactions(crn)