var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   21","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   22","line":"const TypeError = @import(\"type_error.zig\").TypeError;"},
{"lineNum":"   23","line":"const implicitAnyError = @import(\"implicit_any_error.zig\");"},
{"lineNum":"   24","line":"const ImplicitAnyError = implicitAnyError.ImplicitAnyError;"},
{"lineNum":"   25","line":"const OpError = @import(\"op_error.zig\").OpError;"},
{"lineNum":"   26","line":"const ContextError = @import(\"context_error.zig\").ContextError;"},
{"lineNum":"   27","line":"const RedefinitionError = @import(\"redefinition_error.zig\").RedefinitionError;"},
{"lineNum":"   28","line":"const GenericError = @import(\"generic_error.zig\").GenericError;"},
{"lineNum":"   29","line":"const AssignError = @import(\"assign_error.zig\").AssignError;"},
{"lineNum":"   30","line":"const ReturnError = @import(\"return_error.zig\").ReturnError;"},
{"lineNum":"   31","line":"const ParseError = @import(\"../../common/parse_error.zig\").ParseError;"},
{"lineNum":"   32","line":"const TokenType = @import(\"../../common/token.zig\").Token.Type;"},
{"lineNum":"   33","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   34","line":"const reportTestCase = @import(\"report_test_case.zig\").reportTestCase;"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"pub const CompileError = union(CompileError.Type) {"},
{"lineNum":"   37","line":"    pub const Type = enum(u8) {"},
{"lineNum":"   38","line":"        TypeError,"},
{"lineNum":"   39","line":"        OpError,"},
{"lineNum":"   40","line":"        ContextError,"},
{"lineNum":"   41","line":"        RedefinitionError,"},
{"lineNum":"   42","line":"        GenericError,"},
{"lineNum":"   43","line":"        AssignError,"},
{"lineNum":"   44","line":"        ReturnError,"},
{"lineNum":"   45","line":"        ImplicitAnyError,"},
{"lineNum":"   46","line":"        ParseError,"},
{"lineNum":"   47","line":"    };"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    TypeError: TypeError,"},
{"lineNum":"   50","line":"    OpError: OpError,"},
{"lineNum":"   51","line":"    ContextError: ContextError,"},
{"lineNum":"   52","line":"    RedefinitionError: RedefinitionError,"},
{"lineNum":"   53","line":"    GenericError: GenericError,"},
{"lineNum":"   54","line":"    AssignError: AssignError,"},
{"lineNum":"   55","line":"    ReturnError: ReturnError,"},
{"lineNum":"   56","line":"    ImplicitAnyError: ImplicitAnyError,"},
{"lineNum":"   57","line":"    ParseError: ParseError,"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    pub fn typeError(err: TypeError) CompileError {","class":"lineCov","hits":"1","order":"2257","possible_hits":"1",},
{"lineNum":"   60","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2259","possible_hits":"1",},
{"lineNum":"   61","line":"            .TypeError = err,","class":"lineCov","hits":"1","order":"2258","possible_hits":"1",},
{"lineNum":"   62","line":"        };"},
{"lineNum":"   63","line":"    }"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    pub fn opError(err: OpError) CompileError {","class":"lineCov","hits":"1","order":"2287","possible_hits":"1",},
{"lineNum":"   66","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2289","possible_hits":"1",},
{"lineNum":"   67","line":"            .OpError = err,","class":"lineCov","hits":"1","order":"2288","possible_hits":"1",},
{"lineNum":"   68","line":"        };"},
{"lineNum":"   69","line":"    }"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    pub fn contextError(err: ContextError) CompileError {","class":"lineCov","hits":"1","order":"2313","possible_hits":"1",},
{"lineNum":"   72","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2315","possible_hits":"1",},
{"lineNum":"   73","line":"            .ContextError = err,","class":"lineCov","hits":"1","order":"2314","possible_hits":"1",},
{"lineNum":"   74","line":"        };"},
{"lineNum":"   75","line":"    }"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"    pub fn redefinitionError(err: RedefinitionError) CompileError {","class":"lineCov","hits":"1","order":"2340","possible_hits":"1",},
{"lineNum":"   78","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2342","possible_hits":"1",},
{"lineNum":"   79","line":"            .RedefinitionError = err,","class":"lineCov","hits":"1","order":"2341","possible_hits":"1",},
{"lineNum":"   80","line":"        };"},
{"lineNum":"   81","line":"    }"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    pub fn genericError(err: GenericError) CompileError {","class":"lineCov","hits":"1","order":"2364","possible_hits":"1",},
{"lineNum":"   84","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2366","possible_hits":"1",},
{"lineNum":"   85","line":"            .GenericError = err,","class":"lineCov","hits":"1","order":"2365","possible_hits":"1",},
{"lineNum":"   86","line":"        };"},
{"lineNum":"   87","line":"    }"},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    pub fn assignError(err: AssignError) CompileError {","class":"lineCov","hits":"1","order":"2388","possible_hits":"1",},
{"lineNum":"   90","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2390","possible_hits":"1",},
{"lineNum":"   91","line":"            .AssignError = err,","class":"lineCov","hits":"1","order":"2389","possible_hits":"1",},
{"lineNum":"   92","line":"        };"},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    pub fn returnError(err: ReturnError) CompileError {","class":"lineCov","hits":"1","order":"2416","possible_hits":"1",},
{"lineNum":"   96","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2418","possible_hits":"1",},
{"lineNum":"   97","line":"            .ReturnError = err,","class":"lineCov","hits":"1","order":"2417","possible_hits":"1",},
{"lineNum":"   98","line":"        };"},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    pub fn implicitAnyError(err: ImplicitAnyError) CompileError {","class":"lineCov","hits":"1","order":"2443","possible_hits":"1",},
{"lineNum":"  102","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2445","possible_hits":"1",},
{"lineNum":"  103","line":"            .ImplicitAnyError = err,","class":"lineCov","hits":"1","order":"2444","possible_hits":"1",},
{"lineNum":"  104","line":"        };"},
{"lineNum":"  105","line":"    }"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    pub fn parseError(err: ParseError) CompileError {","class":"lineCov","hits":"1","order":"2203","possible_hits":"1",},
{"lineNum":"  108","line":"        return CompileError{","class":"lineCov","hits":"1","order":"2205","possible_hits":"1",},
{"lineNum":"  109","line":"            .ParseError = err,","class":"lineCov","hits":"1","order":"2204","possible_hits":"1",},
{"lineNum":"  110","line":"        };"},
{"lineNum":"  111","line":"    }"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"    pub fn getType(self: CompileError) CompileError.Type {","class":"lineCov","hits":"1","order":"2261","possible_hits":"1",},
{"lineNum":"  114","line":"        return @as(CompileError.Type, self);","class":"lineCov","hits":"1","order":"2262","possible_hits":"1",},
{"lineNum":"  115","line":"    }"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    pub fn report(self: CompileError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2229","possible_hits":"4",},
{"lineNum":"  118","line":"        switch (self) {","class":"linePartCov","hits":"1","order":"2230","possible_hits":"4",},
{"lineNum":"  119","line":"            .TypeError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2268","possible_hits":"2",},
{"lineNum":"  120","line":"            .OpError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2296","possible_hits":"2",},
{"lineNum":"  121","line":"            .ContextError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2323","possible_hits":"2",},
{"lineNum":"  122","line":"            .RedefinitionError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2349","possible_hits":"2",},
{"lineNum":"  123","line":"            .GenericError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2371","possible_hits":"2",},
{"lineNum":"  124","line":"            .AssignError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2397","possible_hits":"2",},
{"lineNum":"  125","line":"            .ReturnError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2425","possible_hits":"2",},
{"lineNum":"  126","line":"            .ImplicitAnyError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2451","possible_hits":"2",},
{"lineNum":"  127","line":"            .ParseError => |err| try err.report(writer),","class":"linePartCov","hits":"1","order":"2231","possible_hits":"2",},
{"lineNum":"  128","line":"        }"},
{"lineNum":"  129","line":"    }"},
{"lineNum":"  130","line":"};"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"test \"can create a CompileError from a TypeError\" {","class":"lineCov","hits":"2","order":"2246","possible_hits":"2",},
{"lineNum":"  133","line":"    const cursor = Cursor.new(5, 7);","class":"lineCov","hits":"1","order":"2247","possible_hits":"1",},
{"lineNum":"  134","line":"    const valueTy = Type.newString();","class":"lineCov","hits":"1","order":"2248","possible_hits":"1",},
{"lineNum":"  135","line":"    const targetTy = Type.newBoolean();","class":"lineCov","hits":"1","order":"2249","possible_hits":"1",},
{"lineNum":"  136","line":"    const typeError = TypeError.new(cursor, &valueTy, &targetTy);","class":"lineCov","hits":"1","order":"2250","possible_hits":"1",},
{"lineNum":"  137","line":"    const compileError = CompileError.typeError(typeError);","class":"lineCov","hits":"1","order":"2256","possible_hits":"1",},
{"lineNum":"  138","line":"    try expectEqual(CompileError.Type.TypeError, compileError.getType());","class":"lineCov","hits":"1","order":"2260","possible_hits":"1",},
{"lineNum":"  139","line":"    try expectEqual(cursor, compileError.TypeError.csr);","class":"lineCov","hits":"2","order":"2263","possible_hits":"2",},
{"lineNum":"  140","line":"    try expectEqual(&valueTy, compileError.TypeError.valueTy);","class":"lineCov","hits":"2","order":"2264","possible_hits":"2",},
{"lineNum":"  141","line":"    try expectEqual(&targetTy, compileError.TypeError.targetTy);","class":"lineCov","hits":"2","order":"2265","possible_hits":"2",},
{"lineNum":"  142","line":"    try reportTestCase(","class":"lineCov","hits":"1","order":"2267","possible_hits":"1",},
{"lineNum":"  143","line":"        compileError,","class":"lineCov","hits":"1","order":"2266","possible_hits":"1",},
{"lineNum":"  144","line":"        \"Type Error: 5:7: The type string is not coercable to the type boolean\\n\","},
{"lineNum":"  145","line":"    );"},
{"lineNum":"  146","line":"}"},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"test \"can create a CompileError from an OpError\" {","class":"lineCov","hits":"2","order":"2277","possible_hits":"2",},
{"lineNum":"  149","line":"    const cursor = Cursor.new(5, 7);","class":"lineCov","hits":"1","order":"2278","possible_hits":"1",},
{"lineNum":"  150","line":"    const op = TokenType.Sub;"},
{"lineNum":"  151","line":"    const ty = Type.newString();","class":"lineCov","hits":"1","order":"2279","possible_hits":"1",},
{"lineNum":"  152","line":"    const opError = OpError.new(cursor, op, &ty);","class":"lineCov","hits":"1","order":"2280","possible_hits":"1",},
{"lineNum":"  153","line":"    const compileError = CompileError.opError(opError);","class":"lineCov","hits":"1","order":"2286","possible_hits":"1",},
{"lineNum":"  154","line":"    try expectEqual(CompileError.Type.OpError, compileError.getType());","class":"lineCov","hits":"1","order":"2290","possible_hits":"1",},
{"lineNum":"  155","line":"    try expectEqual(cursor, compileError.OpError.csr);","class":"lineCov","hits":"2","order":"2291","possible_hits":"2",},
{"lineNum":"  156","line":"    try expectEqual(op, compileError.OpError.op);","class":"lineCov","hits":"2","order":"2292","possible_hits":"2",},
{"lineNum":"  157","line":"    try expectEqual(ty.getType(), compileError.OpError.ty.getType());","class":"lineCov","hits":"2","order":"2293","possible_hits":"2",},
{"lineNum":"  158","line":"    try reportTestCase(","class":"lineCov","hits":"1","order":"2295","possible_hits":"1",},
{"lineNum":"  159","line":"        compileError,","class":"lineCov","hits":"1","order":"2294","possible_hits":"1",},
{"lineNum":"  160","line":"        \"Error: 5:7: Operator \'Sub\' is not defined for type \'string\'\\n\","},
{"lineNum":"  161","line":"    );"},
{"lineNum":"  162","line":"}"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"test \"can create a CompileError from a ContextError\" {","class":"lineCov","hits":"2","order":"2304","possible_hits":"2",},
{"lineNum":"  165","line":"    const cursor = Cursor.new(5, 7);","class":"lineCov","hits":"1","order":"2305","possible_hits":"1",},
{"lineNum":"  166","line":"    const found = \"Something\";"},
{"lineNum":"  167","line":"    const expectedContext = \"a context\";"},
{"lineNum":"  168","line":"    const ctxError = ContextError.new(cursor, found, expectedContext);","class":"lineCov","hits":"1","order":"2306","possible_hits":"1",},
{"lineNum":"  169","line":"    const compileError = CompileError.contextError(ctxError);","class":"lineCov","hits":"1","order":"2312","possible_hits":"1",},
{"lineNum":"  170","line":"    try expectEqual(CompileError.Type.ContextError, compileError.getType());","class":"lineCov","hits":"1","order":"2316","possible_hits":"1",},
{"lineNum":"  171","line":"    try expectEqual(cursor, compileError.ContextError.csr);","class":"lineCov","hits":"2","order":"2317","possible_hits":"2",},
{"lineNum":"  172","line":"    try expectEqualStrings(found, compileError.ContextError.found);","class":"lineCov","hits":"2","order":"2318","possible_hits":"2",},
{"lineNum":"  173","line":"    try expectEqualStrings(","class":"linePartCov","hits":"1","order":"2320","possible_hits":"2",},
{"lineNum":"  174","line":"        expectedContext,"},
{"lineNum":"  175","line":"        compileError.ContextError.expectedContext,","class":"linePartCov","hits":"2","order":"2319","possible_hits":"3",},
{"lineNum":"  176","line":"    );"},
{"lineNum":"  177","line":"    try reportTestCase(","class":"lineCov","hits":"1","order":"2322","possible_hits":"1",},
{"lineNum":"  178","line":"        compileError,","class":"lineCov","hits":"1","order":"2321","possible_hits":"1",},
{"lineNum":"  179","line":"        \"Error: 5:7: Something cannot occur outside of a context\\n\","},
{"lineNum":"  180","line":"    );"},
{"lineNum":"  181","line":"}"},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"test \"can create a CompileError from a RedefinitionError\" {","class":"lineCov","hits":"2","order":"2330","possible_hits":"2",},
{"lineNum":"  184","line":"    const name = \"aSymbol\";"},
{"lineNum":"  185","line":"    const firstDefined = Cursor.new(1, 1);","class":"lineCov","hits":"1","order":"2331","possible_hits":"1",},
{"lineNum":"  186","line":"    const secondDefined = Cursor.new(3, 3);","class":"lineCov","hits":"1","order":"2332","possible_hits":"1",},
{"lineNum":"  187","line":"    const redefError = RedefinitionError.new(name, firstDefined, secondDefined);","class":"lineCov","hits":"1","order":"2333","possible_hits":"1",},
{"lineNum":"  188","line":"    const compileError = CompileError.redefinitionError(redefError);","class":"lineCov","hits":"1","order":"2339","possible_hits":"1",},
{"lineNum":"  189","line":"    try expectEqual(CompileError.Type.RedefinitionError, compileError.getType());","class":"lineCov","hits":"1","order":"2343","possible_hits":"1",},
{"lineNum":"  190","line":"    try expectEqualStrings(name, compileError.RedefinitionError.name);","class":"lineCov","hits":"2","order":"2344","possible_hits":"2",},
{"lineNum":"  191","line":"    try expectEqual(firstDefined, compileError.RedefinitionError.firstDefined);","class":"lineCov","hits":"2","order":"2345","possible_hits":"2",},
{"lineNum":"  192","line":"    try expectEqual(secondDefined, compileError.RedefinitionError.secondDefined);","class":"lineCov","hits":"2","order":"2346","possible_hits":"2",},
{"lineNum":"  193","line":"    try reportTestCase(","class":"lineCov","hits":"1","order":"2348","possible_hits":"1",},
{"lineNum":"  194","line":"        compileError,","class":"lineCov","hits":"1","order":"2347","possible_hits":"1",},
{"lineNum":"  195","line":"        \"Error: 3:3: Redefinition of symbol \'aSymbol\' (first defined at line 1)\\n\","},
{"lineNum":"  196","line":"    );"},
{"lineNum":"  197","line":"}"},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"test \"can create a CompileError from a GenericError\" {","class":"lineCov","hits":"2","order":"2356","possible_hits":"2",},
{"lineNum":"  200","line":"    const csr = Cursor.new(3, 3);","class":"lineCov","hits":"1","order":"2357","possible_hits":"1",},
{"lineNum":"  201","line":"    const msg = \"Some error message\";"},
{"lineNum":"  202","line":"    const genError = GenericError.new(csr, msg);","class":"lineCov","hits":"1","order":"2358","possible_hits":"1",},
{"lineNum":"  203","line":"    const compileError = CompileError.genericError(genError);","class":"lineCov","hits":"1","order":"2363","possible_hits":"1",},
{"lineNum":"  204","line":"    try expectEqual(CompileError.Type.GenericError, compileError.getType());","class":"lineCov","hits":"1","order":"2367","possible_hits":"1",},
{"lineNum":"  205","line":"    try expectEqual(csr, compileError.GenericError.csr);","class":"lineCov","hits":"2","order":"2368","possible_hits":"2",},
{"lineNum":"  206","line":"    try expectEqualStrings(msg, compileError.GenericError.msg);","class":"lineCov","hits":"2","order":"2369","possible_hits":"2",},
{"lineNum":"  207","line":"    try reportTestCase(compileError, \"Error: 3:3: Some error message\\n\");","class":"lineCov","hits":"1","order":"2370","possible_hits":"1",},
{"lineNum":"  208","line":"}"},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"test \"can create a CompileError from an AssignError\" {","class":"lineCov","hits":"2","order":"2377","possible_hits":"2",},
{"lineNum":"  211","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2378","possible_hits":"1",},
{"lineNum":"  212","line":"    const left = Type.newString();","class":"lineCov","hits":"1","order":"2379","possible_hits":"1",},
{"lineNum":"  213","line":"    const right = Type.newNumber();","class":"lineCov","hits":"1","order":"2380","possible_hits":"1",},
{"lineNum":"  214","line":"    const assignErr = AssignError.new(csr, &left, &right);","class":"lineCov","hits":"1","order":"2381","possible_hits":"1",},
{"lineNum":"  215","line":"    const compileError = CompileError.assignError(assignErr);","class":"lineCov","hits":"1","order":"2387","possible_hits":"1",},
{"lineNum":"  216","line":"    try expectEqual(CompileError.Type.AssignError, compileError.getType());","class":"lineCov","hits":"1","order":"2391","possible_hits":"1",},
{"lineNum":"  217","line":"    try expectEqual(csr, compileError.AssignError.csr);","class":"lineCov","hits":"2","order":"2392","possible_hits":"2",},
{"lineNum":"  218","line":"    try expectEqual(&left, compileError.AssignError.left);","class":"lineCov","hits":"2","order":"2393","possible_hits":"2",},
{"lineNum":"  219","line":"    try expectEqual(&right, compileError.AssignError.right);","class":"lineCov","hits":"2","order":"2394","possible_hits":"2",},
{"lineNum":"  220","line":"    try reportTestCase(","class":"lineCov","hits":"1","order":"2396","possible_hits":"1",},
{"lineNum":"  221","line":"        compileError,","class":"lineCov","hits":"1","order":"2395","possible_hits":"1",},
{"lineNum":"  222","line":"        \"Error: 2:5: Value of type number cannot be assigned to a variable of type string\\n\","},
{"lineNum":"  223","line":"    );"},
{"lineNum":"  224","line":"}"},
{"lineNum":"  225","line":""},
{"lineNum":"  226","line":"test \"can create a CompileError from a ReturnError\" {","class":"lineCov","hits":"2","order":"2405","possible_hits":"2",},
{"lineNum":"  227","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2406","possible_hits":"1",},
{"lineNum":"  228","line":"    const expectedTy = Type.newNumber();","class":"lineCov","hits":"1","order":"2407","possible_hits":"1",},
{"lineNum":"  229","line":"    const actualTy = Type.newString();","class":"lineCov","hits":"1","order":"2408","possible_hits":"1",},
{"lineNum":"  230","line":"    const returnErr = ReturnError.new(csr, &expectedTy, &actualTy);","class":"lineCov","hits":"1","order":"2409","possible_hits":"1",},
{"lineNum":"  231","line":"    const compileError = CompileError.returnError(returnErr);","class":"lineCov","hits":"1","order":"2415","possible_hits":"1",},
{"lineNum":"  232","line":"    try expectEqual(CompileError.Type.ReturnError, compileError.getType());","class":"lineCov","hits":"1","order":"2419","possible_hits":"1",},
{"lineNum":"  233","line":"    try expectEqual(csr, compileError.ReturnError.csr);","class":"lineCov","hits":"2","order":"2420","possible_hits":"2",},
{"lineNum":"  234","line":"    try expectEqual(&expectedTy, compileError.ReturnError.expectedTy);","class":"lineCov","hits":"2","order":"2421","possible_hits":"2",},
{"lineNum":"  235","line":"    try expectEqual(&actualTy, compileError.ReturnError.actualTy.?);","class":"lineCov","hits":"2","order":"2422","possible_hits":"2",},
{"lineNum":"  236","line":"    try reportTestCase(","class":"lineCov","hits":"1","order":"2424","possible_hits":"1",},
{"lineNum":"  237","line":"        compileError,","class":"lineCov","hits":"1","order":"2423","possible_hits":"1",},
{"lineNum":"  238","line":"        \"Error: 2:5: Cannot return a value of type string from a function returning number\\n\","},
{"lineNum":"  239","line":"    );"},
{"lineNum":"  240","line":"}"},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"test \"can create a CompileError from an ImplicitAnyError\" {","class":"lineCov","hits":"2","order":"2435","possible_hits":"2",},
{"lineNum":"  243","line":"    const cursor = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2436","possible_hits":"1",},
{"lineNum":"  244","line":"    const symbol = \"anySymbol\";"},
{"lineNum":"  245","line":"    const err = ImplicitAnyError.new(cursor, symbol);","class":"lineCov","hits":"1","order":"2437","possible_hits":"1",},
{"lineNum":"  246","line":"    const compileError = CompileError.implicitAnyError(err);","class":"lineCov","hits":"1","order":"2442","possible_hits":"1",},
{"lineNum":"  247","line":"    try expectEqual(CompileError.Type.ImplicitAnyError, compileError.getType());","class":"lineCov","hits":"1","order":"2446","possible_hits":"1",},
{"lineNum":"  248","line":"    try expectEqual(cursor, compileError.ImplicitAnyError.csr);","class":"lineCov","hits":"2","order":"2447","possible_hits":"2",},
{"lineNum":"  249","line":"    try expectEqualStrings(symbol, compileError.ImplicitAnyError.symbol);","class":"lineCov","hits":"2","order":"2448","possible_hits":"2",},
{"lineNum":"  250","line":"    try reportTestCase(","class":"lineCov","hits":"1","order":"2450","possible_hits":"1",},
{"lineNum":"  251","line":"        compileError,","class":"lineCov","hits":"1","order":"2449","possible_hits":"1",},
{"lineNum":"  252","line":"        \"Error: 2:5: Untyped symbol \'anySymbol\' implicitely has type \'any\'\\n\","},
{"lineNum":"  253","line":"    );"},
{"lineNum":"  254","line":"}"},
{"lineNum":"  255","line":""},
{"lineNum":"  256","line":"test \"can create a CompileError from a ParseError\" {","class":"lineCov","hits":"2","order":"2457","possible_hits":"2",},
{"lineNum":"  257","line":"    const cursor = Cursor.new(3, 5);","class":"lineCov","hits":"1","order":"2458","possible_hits":"1",},
{"lineNum":"  258","line":"    const message = \"Some error message\";"},
{"lineNum":"  259","line":"    const parseError = ParseError.message(cursor, message);","class":"lineCov","hits":"1","order":"2459","possible_hits":"1",},
{"lineNum":"  260","line":"    const compileError = CompileError.parseError(parseError);","class":"lineCov","hits":"1","order":"2460","possible_hits":"1",},
{"lineNum":"  261","line":"    try expectEqual(CompileError.Type.ParseError, compileError.getType());","class":"lineCov","hits":"1","order":"2461","possible_hits":"1",},
{"lineNum":"  262","line":"    try expectEqual(cursor, compileError.ParseError.csr);","class":"lineCov","hits":"2","order":"2462","possible_hits":"2",},
{"lineNum":"  263","line":"    try expectEqualStrings(message, compileError.ParseError.data.Message);","class":"lineCov","hits":"2","order":"2463","possible_hits":"2",},
{"lineNum":"  264","line":"    // TODO: Add test for reporting ParseErrors"},
{"lineNum":"  265","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:59:51", "instrumented" : 133, "covered" : 133,};
var merged_data = [];
