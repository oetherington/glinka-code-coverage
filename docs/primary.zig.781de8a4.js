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
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   21","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   22","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   23","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   24","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   25","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"pub fn inferPrimaryExprType(nd: node.Node, ty: Type.Ptr) InferResult {","class":"lineCov","hits":"1","order":"3230","possible_hits":"1",},
{"lineNum":"   28","line":"    nd.ty = ty;","class":"lineCov","hits":"1","order":"3231","possible_hits":"1",},
{"lineNum":"   29","line":"    return InferResult.success(ty);","class":"lineCov","hits":"1","order":"3232","possible_hits":"1",},
{"lineNum":"   30","line":"}"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"test \"can infer type of int literal\" {","class":"lineCov","hits":"2","order":"6631","possible_hits":"2",},
{"lineNum":"   33","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6653","possible_hits":"1",},
{"lineNum":"   34","line":"        .expectedTy = .Number,"},
{"lineNum":"   35","line":"    }).run(.Int, \"1234\");","class":"lineCov","hits":"1","order":"6632","possible_hits":"1",},
{"lineNum":"   36","line":"}"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"test \"can infer type of float literal\" {","class":"lineCov","hits":"2","order":"6654","possible_hits":"2",},
{"lineNum":"   39","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6657","possible_hits":"1",},
{"lineNum":"   40","line":"        .expectedTy = .Number,"},
{"lineNum":"   41","line":"    }).run(.Float, \"1.234\");","class":"lineCov","hits":"1","order":"6655","possible_hits":"1",},
{"lineNum":"   42","line":"}"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"test \"can infer type of string literals\" {","class":"lineCov","hits":"2","order":"6658","possible_hits":"2",},
{"lineNum":"   45","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6660","possible_hits":"1",},
{"lineNum":"   46","line":"        .expectedTy = .String,"},
{"lineNum":"   47","line":"    }).run(.String, \"\'a string\'\");","class":"lineCov","hits":"1","order":"6659","possible_hits":"1",},
{"lineNum":"   48","line":"}"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"test \"can infer type of template literals\" {","class":"lineCov","hits":"2","order":"6661","possible_hits":"2",},
{"lineNum":"   51","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6663","possible_hits":"1",},
{"lineNum":"   52","line":"        .expectedTy = .String,"},
{"lineNum":"   53","line":"    }).run(.Template, \"`a template`\");","class":"lineCov","hits":"1","order":"6662","possible_hits":"1",},
{"lineNum":"   54","line":"}"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"test \"can infer type of booleans\" {","class":"lineCov","hits":"2","order":"6664","possible_hits":"2",},
{"lineNum":"   57","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6666","possible_hits":"1",},
{"lineNum":"   58","line":"        .expectedTy = .Boolean,"},
{"lineNum":"   59","line":"    }).run(.True, {});","class":"lineCov","hits":"1","order":"6665","possible_hits":"1",},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6668","possible_hits":"1",},
{"lineNum":"   62","line":"        .expectedTy = .Boolean,"},
{"lineNum":"   63","line":"    }).run(.False, {});","class":"lineCov","hits":"1","order":"6667","possible_hits":"1",},
{"lineNum":"   64","line":"}"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"test \"can infer type of \'null\'\" {","class":"lineCov","hits":"2","order":"6669","possible_hits":"2",},
{"lineNum":"   67","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6671","possible_hits":"1",},
{"lineNum":"   68","line":"        .expectedTy = .Null,"},
{"lineNum":"   69","line":"    }).run(.Null, {});","class":"lineCov","hits":"1","order":"6670","possible_hits":"1",},
{"lineNum":"   70","line":"}"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"test \"can infer type of \'undefined\'\" {","class":"lineCov","hits":"2","order":"6672","possible_hits":"2",},
{"lineNum":"   73","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6674","possible_hits":"1",},
{"lineNum":"   74","line":"        .expectedTy = .Undefined,"},
{"lineNum":"   75","line":"    }).run(.Undefined, {});","class":"lineCov","hits":"1","order":"6673","possible_hits":"1",},
{"lineNum":"   76","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:43:36", "instrumented" : 26, "covered" : 26,};
var merged_data = [];
